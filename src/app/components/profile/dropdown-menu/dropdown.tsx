
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { BsChevronExpand } from "react-icons/bs";
import { AvatarUser } from "../avatar";
import { useUser } from "@/src/app/shared/context/userData";
import { PiCrownSimpleFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";

export function DropdownMenuDemo() {
    const data = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className="mt-1 mr-4"><BsChevronExpand /></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <section className="flex flex-row gap-1 items-center">
            
        <AvatarUser size="w-[25px] h-[25px]" avatarUrl={data?.avatar} />
        <DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
        <span className="text-[10px] text-muted-foreground mt-0.5">{data?.plan}</span>
        </section>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Perfil</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Planos</DropdownMenuItem>
                <DropdownMenuItem>Faturas</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Outros...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Projetos</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>ryanvs.dev</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
     
          <DropdownMenuItem className="flex flex-row gap-1">
            <PiCrownSimpleFill color="#daa520"/> PRO
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
      
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Usuários</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
              <DropdownMenuItem className="flex flex-row gap-1"><FaCircle size={10} color="#66CC33" /> {data?.username}</DropdownMenuItem>
 
             
           
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem disabled>
            Novo usuário
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Suporte</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
