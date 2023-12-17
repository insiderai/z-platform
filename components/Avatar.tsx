"use client"

import Image from "next/image";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ProfileImageForm } from "./forms/ProfileImageForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes";
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Edit } from "lucide-react";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
    src?: string;
    editable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, src, editable }) => {
    const { theme } = useTheme();
    const router = useRouter();
    const { data: fetchedUser } = useUser(userId);
    const { data: currentUser } = useCurrentUser();
    const [open, setOpen] = useState(false);

    function onClick() {
        if (editable) {
            if (userId == currentUser.id) {
                setOpen(true);
            }
        } else {
            router.push(`/users/${userId}`);
        }
    }

    function imageSrc() {
        let source;

        if (src) {
            source = src;
        } else if (fetchedUser?.profileImage) {
            source = fetchedUser?.profileImage;
        } else {
            source = '/avatars/placeholder.png'
        }

        return source;
    }

    return (
        <>
            <div className={`${hasBorder ? 'border-4 border-secondary dark:border-black' : ''} ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-12'} group rounded-full hover:opacity-90 transition cursor-pointer relative`}>
                <Image
                    fill
                    alt="Avatar"
                    onClick={onClick}
                    src={imageSrc()}
                    className="object-cover rounded-full" />

                {editable && userId == currentUser.id &&
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary/60 rounded-full p-2 invisible group-hover:visible">
                        <Edit size={24} className="text-primary-foreground" />
                    </div>
                }
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center !mt-[-1rem]">
                            {theme === "light" ?
                                <Image priority src={"/z-light.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
                                :
                                <Image priority src={"/z-dark.svg"} alt="Z logo" width={40} height={40} className="ms-2 hover:bg-primary-foreground/10 rounded-full mt-3" />
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <ProfileImageForm userId={userId} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Avatar;