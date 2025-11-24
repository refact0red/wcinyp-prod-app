"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Plus, SearchLg } from "@untitledui/icons";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table01DividerLineSm, type DirectoryTableItem } from "@/components/application/table/table-01-divider-line-sm";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import teamMembers from "@/components/application/table/team-members.json" assert { type: "json" };
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

type PersonFormState = {
    name: string;
    title: string;
    email: string;
    phone: string;
    tags: string;
};

const emptyForm: PersonFormState = {
    name: "",
    title: "",
    email: "",
    phone: "",
    tags: "",
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

const formatTags = (tags: string) =>
    tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

const formFromPerson = (person: DirectoryTableItem | null): PersonFormState => {
    if (!person) return emptyForm;

    const emailContact = person.contacts?.find((c) => c.type === "email")?.value ?? person.email ?? "";
    const phoneContact = person.contacts?.find((c) => c.type !== "email")?.value ?? "";

    return {
        name: person.name ?? "",
        title: person.title ?? person.role ?? "",
        email: emailContact,
        phone: phoneContact,
        tags: person.tags?.map((tag) => tag.name).join(", ") ?? "",
    };
};

type PersonSlideoutProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    person: DirectoryTableItem | null;
    onSubmit: (data: PersonFormState) => void;
    onDelete?: () => void;
};

const PersonSlideout = ({ isOpen, onOpenChange, mode, person, onSubmit, onDelete }: PersonSlideoutProps) => {
    const [formState, setFormState] = useState<PersonFormState>(emptyForm);

    useEffect(() => {
        setFormState(formFromPerson(person));
    }, [person, isOpen]);

    const updateField = (field: keyof PersonFormState) => (value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        onSubmit(formState);
    };

    const heading = mode === "edit" ? "Edit person" : "Add person";
    const subheading = mode === "edit" ? "Update contact details, tags, and role." : "Create a new entry for the directory.";

    return (
        <SlideoutMenu.Trigger isOpen={isOpen} onOpenChange={onOpenChange}>
            <SlideoutMenu isDismissable>
                <SlideoutMenu.Header onClose={() => onOpenChange(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                    <h1 className="text-md font-semibold text-primary md:text-lg">{heading}</h1>
                    <p className="text-sm text-tertiary">{subheading}</p>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <Form id="person-form" className="flex flex-col gap-4 pb-2" onSubmit={handleSubmit}>
                        <Input
                            size="md"
                            label="Full name"
                            isRequired
                            placeholder="e.g. Jane Doe"
                            value={formState.name}
                            onChange={updateField("name")}
                        />
                        <Input
                            size="md"
                            label="Title or role"
                            placeholder="e.g. Senior Nurse"
                            value={formState.title}
                            onChange={updateField("title")}
                        />
                        <Input
                            size="md"
                            label="Email"
                            placeholder="name@company.com"
                            value={formState.email}
                            onChange={updateField("email")}
                        />
                        <Input
                            size="md"
                            label="Phone"
                            placeholder="(555) 555-5555"
                            value={formState.phone}
                            onChange={updateField("phone")}
                        />
                        <Input
                            size="md"
                            label="Tags"
                            placeholder="Comma separated (e.g. Nurse Lead, IT)"
                            value={formState.tags}
                            onChange={updateField("tags")}
                        />
                    </Form>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                    {mode === "edit" && onDelete && (
                        <Button size="md" color="secondary-destructive" type="button" onClick={onDelete} className="mr-auto">
                            Delete
                        </Button>
                    )}
                    <Button size="md" color="secondary" type="button" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button size="md" type="submit" form="person-form">
                        Save
                    </Button>
                </SlideoutMenu.Footer>
            </SlideoutMenu>
        </SlideoutMenu.Trigger>
    );
};

export const DirectoryScreen = () => {
    const pathname = usePathname();
    const [people, setPeople] = useState<DirectoryTableItem[]>(() => (teamMembers as { items: DirectoryTableItem[] }).items);
    const [search, setSearch] = useState("");
    const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [activePerson, setActivePerson] = useState<DirectoryTableItem | null>(null);

    const filteredPeople = useMemo(() => {
        const term = search.toLowerCase().trim();
        if (!term) return people;

        const matches = (value?: string) => value?.toLowerCase().includes(term);

        return people.filter((person) => {
            const tagMatches = person.tags?.some((tag) => matches(tag.name));
            const contactMatches = person.contacts?.some((contact) => matches(contact.value));
            return matches(person.name) || matches(person.title ?? person.role) || tagMatches || contactMatches;
        });
    }, [people, search]);

    const openCreate = () => {
        setMode("create");
        setActivePerson(null);
        setIsSlideoutOpen(true);
    };

    const openEdit = (person: DirectoryTableItem) => {
        setMode("edit");
        setActivePerson(person);
        setIsSlideoutOpen(true);
    };

    const ensureUniqueUsername = (candidate: string, existing: DirectoryTableItem[], current?: string) => {
        const sanitized = candidate || "person";
        let attempt = sanitized;
        let suffix = 1;

        const isTaken = (username: string) => existing.some((p) => p.username === username && p.username !== current);

        while (isTaken(attempt)) {
            attempt = `${sanitized}-${suffix}`;
            suffix += 1;
        }

        return attempt;
    };

    const handleSave = (data: PersonFormState) => {
        const tags = formatTags(data.tags).map((tag) => ({
            name: tag,
            color: "gray-blue" as const,
        }));
        const contacts: NonNullable<DirectoryTableItem["contacts"]> = [];
        if (data.email) {
            contacts.push({ type: "email", value: data.email });
        }
        if (data.phone) {
            contacts.push({ type: "phone", label: "Phone", value: data.phone });
        }

        const username = activePerson
            ? activePerson.username
            : ensureUniqueUsername(slugify(data.name), people);

        const nextPerson: DirectoryTableItem = {
            ...activePerson,
            username,
            name: data.name || "New person",
            title: data.title || undefined,
            contacts: contacts.length ? contacts : undefined,
            email: data.email || undefined,
            tags: tags.length ? tags : undefined,
            entityType: "person",
        };

        setPeople((prev) => {
            if (mode === "edit" && activePerson) {
                return prev.map((person) => (person.username === activePerson.username ? nextPerson : person));
            }
            return [...prev, nextPerson];
        });

        setIsSlideoutOpen(false);
        setActivePerson(null);
    };

    const handleDelete = (person: DirectoryTableItem) => {
        const confirmDelete = typeof window !== "undefined" ? window.confirm(`Remove ${person.name} from the directory?`) : true;
        if (!confirmDelete) return;

        setPeople((prev) => prev.filter((entry) => entry.username !== person.username));
        setActivePerson(null);
        setIsSlideoutOpen(false);
    };

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItemsSimple}
                footerItems={footerItems}
            />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={pathname} sidebarItems={navItemsSimple} />

                <main className="flex-1">
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                        <div className="overflow-hidden rounded-2xl border border-secondary bg-primary shadow-xs">
                            <div className="flex flex-col gap-5 border-b border-secondary p-4 md:p-5">
                                <SectionHeader.Group>
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <SectionHeader.Heading>People</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Find teammates, see which teams they are on, and make updates quickly.</SectionHeader.Subheading>
                                    </div>
                                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-2">
                                        <div className="md:w-72">
                                            <Input
                                                size="sm"
                                                aria-label="Search"
                                                placeholder="Search directory"
                                                icon={SearchLg}
                                                value={search}
                                                onChange={setSearch}
                                            />
                                        </div>
                                        <Button size="sm" iconLeading={Plus} onClick={openCreate}>
                                            Add person
                                        </Button>
                                    </div>
                                </SectionHeader.Group>
                            </div>

                            <Table01DividerLineSm
                                withCard={false}
                                items={filteredPeople}
                                onEdit={openEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </main>
            </div>

            <PersonSlideout
                isOpen={isSlideoutOpen}
                onOpenChange={setIsSlideoutOpen}
                mode={mode}
                person={activePerson}
                onSubmit={handleSave}
                onDelete={activePerson ? () => handleDelete(activePerson) : undefined}
            />
        </div>
    );
};
