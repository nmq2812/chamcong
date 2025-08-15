import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { translate } from "@/lib/translate/translate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function AddDeviceForm({
    branchData,
    deviceData,
    setDeviceData,
}: {
    branchData?: Branch[];
    deviceData: DeviceDisplay[];
    setDeviceData: (d: DeviceDisplay[]) => void;
}) {
    const [open, setOpen] = React.useState(false);

    const formSchema = z.object({
        name: z.string().min(1, { message: translate("Name is required") }),
        branch: z
            .string()
            .min(1, { message: translate("Branch is required") })
            .refine((val) => branchData?.some((b) => b.id === val), {
                message: translate("Invalid branch"),
            }),
        status: z.enum(["active", "inactive"], {
            message: translate("Status is required"),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            branch: "",
            status: "active",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const newDevice: DeviceDisplay = {
            id: (deviceData.length + 1).toString(), // Generate a random ID
            name: data.name,
            branchId: data.branch,
            activeStatus: data.status === "active" ? "ACTIVE" : "INACTIVE",
            branchName:
                branchData?.find((b) => b.id === data.branch)?.name ||
                "Unknown Branch",
        };
        setDeviceData([...deviceData, newDevice]);
        setOpen(false);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {translate("Add Device")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Device</DialogTitle>
                    <DialogDescription>
                        {translate("Add a new device to the system")}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {translate("Device name")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter device name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branchData?.map((branch) => {
                                                return (
                                                    <SelectItem
                                                        key={branch.id}
                                                        value={branch.id}
                                                    >
                                                        {branch.name}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        defaultValue="active"
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">
                                                ACTIVE
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                INACTIVE
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDeviceForm;
