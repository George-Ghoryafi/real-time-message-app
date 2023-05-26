'use client';

'use client';

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    //hiding it if the conversation is open
    return null;
  }
    //otherwise we style it as follows
  return ( 
    <div 
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem 
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
   );
}
 
export default MobileFooter;