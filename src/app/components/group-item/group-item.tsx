import { PiChartPieSliceFill } from "react-icons/pi";
import { Button } from "../ui/button";
import { LuBookMinus } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineCreditCard } from "react-icons/ai";

export const GroupItem = () => {
  return (
    <div className="mt-8">
      <h3 className="rounded-sm text-sm font-medium text-muted-foreground">
        Meu projeto
      </h3>
      <ul className="mt-2">
        <li>
          <Button
            variant="ghost"
            className="gap-4 w-full justify-start font-normal"
          >
            <PiChartPieSliceFill size={20} /> Analytics
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="gap-4 w-full justify-start font-normal"
          >
            <LuBookMinus size={20} /> Storybook
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="gap-4 w-full justify-start font-normal"
          >
            <IoDocumentTextOutline size={20} /> Documentação
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="gap-4 w-full justify-start font-normal"
          >
            <AiOutlineCreditCard size={20} /> Despesas
          </Button>
        </li>
      </ul>
    </div>
  );
};
