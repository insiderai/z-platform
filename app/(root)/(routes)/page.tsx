"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { LoginForm } from '@/components/forms/LoginForm';
import { SignUpForm } from '@/components/forms/SignUpForm';
import { ScrollArea } from '@/components/ui/scroll-area';

const RootPage = () => {
  const session = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push('/home')
    }
  }, [router, session?.status])


  return (
    <section>
     <h1 className="text-6xl font-bold">
        discover what <br /> is happening now <br /> on the <span style={{ color: 'orangered' }}>web3</span>
      </h1>

      <h2 className="text-3xl font-bold mt-12">
        Join Today,
      </h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[19rem] mt-6">
            Create account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
              {theme === "dark" ?
                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} />
                :
                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} />
              }
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[24rem] md:h-full">
            <SignUpForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <h3 className="mt-16">
        Already have an account?
      </h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[19rem] my-4" variant="outline">
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
              {theme === "dark" ?
                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} />
                :
                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} />
              }
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[24rem] md:h-full">
            <LoginForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default RootPage;