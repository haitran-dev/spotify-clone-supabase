import { Subscription, UserDetail } from "@/types";
import {
  useSessionContext,
  useUser as useSupabaseUser,
  User,
} from "@supabase/auth-helpers-react";
import React, { useContext, useEffect } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetail | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined,
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserDetail | null>(null);
  const [subscription, setSubscription] = React.useState<Subscription | null>(
    null,
  );

  const user = useSupabaseUser();

  const accessToken = session?.access_token ?? null;

  const getUserDetails = () => supabase.from("users").select("*").single();

  const getSubscription = () =>
    supabase
      .from("subscription")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status == "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetail);
          }

          if (subscriptionPromise.status == "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        },
      );
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};
