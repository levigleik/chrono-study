"use client";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
	discipline: z.string().nonempty(),
	subject: z.string().nonempty(),
});

export default function ChronoStudyComponent() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
	};
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold mb-4">ChronoStudy</h1>
			<Card className="flex w-full h-[85dvh] py-4">
				<CardContent className="overflow-auto px-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-2/3 space-y-6"
						>
							<FormField
								control={form.control}
								name="discipline"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Disiplina</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a verified email to display" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											You can manage email addresses in your{" "}
											<Link href="/examples/forms">email settings</Link>.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tema</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a verified email to display" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											You can manage email addresses in your{" "}
											<Link href="/examples/forms">email settings</Link>.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
