 "use client";
 
 import { usePathname } from "next/navigation";
 import { navItemsSimple, footerItems } from "@/app/nav-items";
 import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
 import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
 
 export const CalendarsScreen = () => {
     const pathname = usePathname();
 
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
                         {/* Placeholder content for calendars */}
                     </div>
                 </main>
             </div>
         </div>
     );
 };
