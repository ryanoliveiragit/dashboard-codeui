"use client"
import { useState, useEffect } from "react";
import { useUserProfile } from "@/services/user/get-user-profile";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { PiWarningCircle } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UserConfigurations } from "./form/ChangeAvatar/user-config";
import { UserContactConfig } from "./form/Contact/user-contact-config";
import { UserCurrencyConfig } from "./form/currentyValue/user-currency";
import { UserNotifySet } from "./form/notifyDisabled/user-notifySet";
import { UserID } from "./form/userID/user-id";
import { DeleteAccount } from "./form/deleteAccount/user-delete-account";

import { useLoadingContext } from "@/shared/context/loading";


export const GeralConfig = () => {
  const { refresh } = useLoadingContext();
const {loading} = useUserProfile()

  return (
    <div>
      <section className="flex flex-col gap-5 ">
      <div className="w-full flex border-2 rounded-md " >
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
        {refresh || loading ? (
          <div className="flex flex-col gap-5 mt-9">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="mt-2 w-full h-[150px]" />
            ))}
          </div>
        ) : (
          
          <>
            <UserConfigurations />
            <UserContactConfig />
            <UserCurrencyConfig />
            <UserNotifySet />
            <UserID />
            <DeleteAccount />
          </>
        )}
      </section>
   
    </div>
  );
};
