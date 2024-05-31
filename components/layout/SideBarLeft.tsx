import FollowBar from "@/components/FollowBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SideBarLeft = () => {
    return (
        <aside className="ps-4 hidden md:block xl:ps-8">
            <div className="sticky top-0 bg-primary z-50 pb-3 pt-2">
                <Input placeholder="Search" className="ps-14 lg:w-[21rem]" />
                <Search className="absolute top-5 left-4 text-muted-foreground" size={18} />
            </div>

            <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5 gap-y-4">
                <p className='text-center font-bold text-xl'>Best insider of the month</p>
                <FollowBar />
            </div>

            <ul className="flex flex-col list-disc px-5 py-2 bg-background rounded-2xl mt-5">
                <h2 className="text-xl text-center">Hot Tokens Today
                </h2>
                <li className="text-md text-muted-foreground ms-4">Pepe</li>
                <li className="text-md text-muted-foreground ms-4">Mog</li>
                <li className="text-md text-muted-foreground ms-4">Maga</li>
                <li className="text-md text-muted-foreground ms-4">GME</li>
                <li className="text-md text-muted-foreground ms-4">Hype</li>
                <li className="text-md text-muted-foreground ms-4">Tongo</li>
                <li className="text-md text-muted-foreground ms-4">Insd</li>
                <Button className="my-2 px-10 py-0">
                 View More
                </Button>
            </ul>


            <div className="flex flex-col px-5 py-2 bg-background rounded-2xl mt-5 gap-y-4">
                <p className='text-center font-bold text-xl'>Your Ads Here</p>
                <FollowBar />
            </div>
        </aside>



    )
}

export default SideBarLeft;