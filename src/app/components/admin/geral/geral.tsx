import { PiWarningCircle } from "react-icons/pi";
import { UserConfigurations } from "./form/ChangeAvatar/user-config";
import { UserContactConfig } from "./form/Contact/user-contact-config";
import { UserCurrencyConfig } from "./form/currentyValue/user-currency";
import { UserNotifySet } from "./form/notifyDisabled/user-notifySet";
import { UserID } from "./form/userID/user-id";
import { DeleteAccount } from "./form/deleteAccount/user-delete-account";



export default function GeralConfig(){

  return (
    <div>
      <section className="flex flex-col gap-5">
        <div className="w-full flex border-2 rounded-md ">
          <div className="flex w-full flex-row items-center flex-1 justify-between py-3 px-4 text-sm">
            <div className="flex flex-row gap-5 items-center">
              <PiWarningCircle size={35} color="#fb6376" />
              <h1 className="text-muted-foreground mr-5">
                Ao confirmar as alterações abaixo,{" "}
                <span className="text-primary font-semibold">
                  você estará modificando as informações associadas à sua conta
                </span>
                . Essas mudanças podem afetar diretamente a configuração e o
                funcionamento da plataforma.
              </h1>
            </div>
          </div>
        </div>
    
          <div className="flex flex-col gap-10 mb-10">
            <UserConfigurations />
            <UserContactConfig />
            <UserCurrencyConfig />
            <UserNotifySet />
            <UserID />
            <DeleteAccount />
          </div>
     
      </section>
    </div>
  );
};
