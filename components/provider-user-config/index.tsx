import { ReactNode } from "react";
import { Button } from "../ui/button";

type ProviderUserConfigType = {
  title: string;
  subTitle?: string;
  description?: string;
  avatar?: ReactNode;
  footer: string;
  content?: any;
  action?: any;
};

export const ProviderUserConfig = ({
  title,
  description,
  subTitle,
  avatar,
  content,
  action,
  footer,
}: ProviderUserConfigType) => {
  return (
    <section>
      <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div>
            <h2 className="text-sm">{subTitle}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <section className="mt-2">{content}</section>
        </section>
        <section>{avatar}</section>
      </div>
      <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
        {footer}
        {action ? <Button className="h-8" variant="outline" type="submit" onClick={action}>Salvar</Button> : ""}
      </footer>
    </section>
  );
};
