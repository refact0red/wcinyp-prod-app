"use client";

import * as React from "react";
import { BlocksIcon, Edit2Icon } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/shadcn/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn/ui/table";
import { formatPhoneGroup } from "@/lib/wcinyp/phones";
import { wcinypLocations } from "@/lib/wcinyp/locations";
import {
    wcinypStaff,
    type WcinypStaffMember,
    type WcinypStaffRole,
    type WcinypStaffStatus,
} from "@/lib/wcinyp/staff";

type StaffFormState = {
    id: string;
    name: string;
    role: WcinypStaffRole;
    email: string;
    primaryLocationId: string;
    officeDigits: string;
    officeExtensions: string;
    mobileDigits: string;
    status: WcinypStaffStatus;
};

const toFormState = (member: WcinypStaffMember): StaffFormState => ({
    id: member.id,
    name: member.name,
    role: member.role,
    email: member.email ?? "",
    primaryLocationId: member.primaryLocationId,
    officeDigits: member.officePhone?.primary.digits ?? "",
    officeExtensions: (member.officePhone?.extensions ?? []).join(", "),
    mobileDigits: member.mobilePhone?.primary.digits ?? "",
    status: member.status,
});

const updateMemberFromForm = (original: WcinypStaffMember, form: StaffFormState): WcinypStaffMember => {
    const normalize = (value: string) => value.trim();

    const parseExtensions = (value: string) =>
        value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

    const officeExtensions = parseExtensions(form.officeExtensions);

    return {
        ...original,
        name: normalize(form.name) || original.name,
        role: form.role,
        email: normalize(form.email) || undefined,
        primaryLocationId: form.primaryLocationId || original.primaryLocationId,
        officePhone:
            normalize(form.officeDigits) || officeExtensions.length
                ? {
                      primary: { digits: normalize(form.officeDigits) || original.officePhone?.primary.digits || "" },
                      extensions: officeExtensions.length ? officeExtensions : undefined,
                      others: original.officePhone?.others,
                  }
                : undefined,
        mobilePhone: normalize(form.mobileDigits)
            ? {
                  primary: { digits: normalize(form.mobileDigits) },
              }
            : undefined,
        status: form.status,
    };
};

const roleOptions: WcinypStaffRole[] = ["Practice Manager", "Practice Specialist", "Senior Patient Coordinator"];

const statusOptions: WcinypStaffStatus[] = ["active", "inactive"];

const locationNameById = new Map(wcinypLocations.map((loc) => [loc.id, loc.name]));

export default function StaffAdminPage() {
    const [staff, setStaff] = React.useState<WcinypStaffMember[]>(wcinypStaff);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [formState, setFormState] = React.useState<StaffFormState | null>(null);

    const editingMember = React.useMemo(
        () => (editingId ? staff.find((member) => member.id === editingId) ?? null : null),
        [editingId, staff],
    );

    React.useEffect(() => {
        if (!editingMember) {
            setFormState(null);
            return;
        }
        setFormState(toFormState(editingMember));
    }, [editingMember]);

    const normalize = (value?: string | null) => value?.trim() ?? "";

    const isDirty = React.useMemo(() => {
        if (!editingMember || !formState) return false;
        const baseline = toFormState(editingMember);
        return Object.keys(baseline).some(
            (key) => normalize(formState[key as keyof StaffFormState]) !== normalize(baseline[key as keyof StaffFormState]),
        );
    }, [editingMember, formState]);

    const handleFieldChange =
        (field: keyof StaffFormState) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            if (!formState) return;
            setFormState({ ...formState, [field]: event.target.value } as StaffFormState);
        };

    const handleEdit = (member: WcinypStaffMember) => {
        setEditingId(member.id);
    };

    const handleClose = () => {
        setEditingId(null);
        setFormState(null);
    };

    const attemptClose = () => {
        if (isDirty) {
            const confirmed =
                typeof window === "undefined" ? true : window.confirm("Discard changes to this staff member?");
            if (!confirmed) return;
        }
        handleClose();
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingMember || !formState) return;

        const name = formState.name.trim();
        const locationId = formState.primaryLocationId.trim();

        if (!name || !locationId) {
            if (typeof window !== "undefined") {
                window.alert("Name and primary location are required.");
            }
            return;
        }

        const updated = updateMemberFromForm(editingMember, formState);
        setStaff((prev) => prev.map((member) => (member.id === updated.id ? updated : member)));
        handleClose();
    };

    const sortedStaff = React.useMemo(
        () =>
            [...staff].sort((a, b) => {
                const locationCompare =
                    (locationNameById.get(a.primaryLocationId) ?? "").localeCompare(
                        locationNameById.get(b.primaryLocationId) ?? "",
                    );
                if (locationCompare !== 0) return locationCompare;
                const roleCompare = a.role.localeCompare(b.role);
                if (roleCompare !== 0) return roleCompare;
                return a.name.localeCompare(b.name);
            }),
        [staff],
    );

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Staff"
                    actions={
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <BlocksIcon className="size-4" />
                            <span>Managing WCINYP staff primitives</span>
                        </div>
                    }
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardContent className="px-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[20%]">Name</TableHead>
                                                    <TableHead className="w-[15%]">Role</TableHead>
                                                    <TableHead className="w-[20%]">Primary location</TableHead>
                                                    <TableHead className="w-[15%]">Office</TableHead>
                                                    <TableHead className="w-[15%]">Mobile</TableHead>
                                                    <TableHead className="w-[10%]">Status</TableHead>
                                                    <TableHead className="w-[5%] text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sortedStaff.map((member) => {
                                                    const locationName =
                                                        locationNameById.get(member.primaryLocationId) ??
                                                        member.primaryLocationId;

                                                    return (
                                                        <TableRow key={member.id}>
                                                            <TableCell className="font-medium">{member.name}</TableCell>
                                                            <TableCell>{member.role}</TableCell>
                                                            <TableCell>{locationName}</TableCell>
                                                            <TableCell>
                                                                {member.officePhone ? (
                                                                    <span className="text-sm">
                                                                        {formatPhoneGroup(member.officePhone)}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-muted-foreground text-sm">—</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {member.mobilePhone ? (
                                                                    <span className="text-sm">
                                                                        {formatPhoneGroup(member.mobilePhone)}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-muted-foreground text-sm">—</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        member.status === "active"
                                                                            ? "outline"
                                                                            : "secondary"
                                                                    }
                                                                    className="capitalize"
                                                                >
                                                                    {member.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button
                                                                    type="button"
                                                                    size="icon-sm"
                                                                    variant="ghost"
                                                                    onClick={() => handleEdit(member)}
                                                                >
                                                                    <Edit2Icon className="size-4" />
                                                                    <span className="sr-only">Edit</span>
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>

                            <Sheet open={!!editingMember} onOpenChange={(open) => !open && attemptClose()}>
                                <SheetContent side="right" className="flex flex-col sm:max-w-md">
                                    <SheetHeader>
                                        <SheetTitle>Edit staff member</SheetTitle>
                                    </SheetHeader>
                                    {formState && (
                                        <form
                                            id="staff-form"
                                            className="mt-6 flex-1 space-y-4 overflow-y-auto px-4 pb-4 pr-5"
                                            onSubmit={handleSave}
                                        >
                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-name">Name</Label>
                                                <Input
                                                    id="staff-name"
                                                    value={formState.name}
                                                    onChange={handleFieldChange("name")}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-role">Role</Label>
                                                <select
                                                    id="staff-role"
                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                                    value={formState.role}
                                                    onChange={handleFieldChange("role")}
                                                >
                                                    {roleOptions.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-location">Primary location</Label>
                                                <select
                                                    id="staff-location"
                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                                    value={formState.primaryLocationId}
                                                    onChange={handleFieldChange("primaryLocationId")}
                                                >
                                                    {wcinypLocations.map((location) => (
                                                        <option key={location.id} value={location.id}>
                                                            {location.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-email">Email</Label>
                                                <Input
                                                    id="staff-email"
                                                    type="email"
                                                    value={formState.email}
                                                    onChange={handleFieldChange("email")}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-office-digits">Office phone (digits)</Label>
                                                <Input
                                                    id="staff-office-digits"
                                                    value={formState.officeDigits}
                                                    onChange={handleFieldChange("officeDigits")}
                                                    placeholder="6469623330"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-office-extensions">
                                                    Office extensions (comma separated)
                                                </Label>
                                                <Input
                                                    id="staff-office-extensions"
                                                    value={formState.officeExtensions}
                                                    onChange={handleFieldChange("officeExtensions")}
                                                    placeholder="9288, 9289"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-mobile-digits">Mobile phone (digits)</Label>
                                                <Input
                                                    id="staff-mobile-digits"
                                                    value={formState.mobileDigits}
                                                    onChange={handleFieldChange("mobileDigits")}
                                                    placeholder="9175830728"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="staff-status">Status</Label>
                                                <select
                                                    id="staff-status"
                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                                    value={formState.status}
                                                    onChange={handleFieldChange("status")}
                                                >
                                                    {statusOptions.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </form>
                                    )}
                                    <div className="border-t bg-card/80 px-4 pb-4 pt-3 backdrop-blur">
                                        <div className="flex flex-col gap-2">
                                            <Button type="submit" form="staff-form">
                                                Save changes
                                            </Button>
                                            <Button type="button" variant="outline" onClick={attemptClose}>
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

