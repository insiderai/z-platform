"use client"

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Edit } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CoverImageForm } from "./forms/CoverImageForm";

interface HeroProps {
    userId: string;
    src?: string;
    editable?: boolean;
}

const Hero: React.FC<HeroProps> = ({ userId, src, editable }) => {
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
        }
    }

    function imageSrc() {
        let source;

        if (src) {
            source = src;
        } else if (fetchedUser?.coverImage) {
            source = fetchedUser?.coverImage;
        }
        return source;
    }

    return (
        <>
            <div className={`${editable && "cursor-pointer"} w-full h-full group relative`}>
                {fetchedUser.coverImage &&
                    <Image
                        fill
                        alt="Cover Image"
                        src={imageSrc()}
                        onClick={onClick}
                        style={{ objectFit: 'contain' }} />
                }

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
                    <CoverImageForm userId={userId} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Hero;