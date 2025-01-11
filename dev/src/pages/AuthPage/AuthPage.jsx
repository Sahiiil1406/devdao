import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Zod validation schema for login
const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." }),
});

// Zod validation schema for register
const registerSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters." }),
	email: z.string().email({ message: "Invalid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." }),
});

export default function AuthPage() {
	// State to manage tabs
	const [tab, setTab] = useState("login");

	// Hook for login form
	const loginForm = useForm({
		resolver: zodResolver(loginSchema),
	});

	// Hook for register form
	const registerForm = useForm({
		resolver: zodResolver(registerSchema),
	});

	// Handle login form submission
	const handleLoginSubmit = (data) => {
		console.log(data);
	};

	// Handle register form submission
	const handleRegisterSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className="w-full h-[100vh] flex ">
			<div className=" flex-1 p-8 ">
				<img
					className="w-full h-full rounded-[100px]"
					src="https://www.freemockupworld.com/wp-content/uploads/2023/12/Stylish-iPhone-15-Free-Mockup-01.jpg"
					alt=""
				/>{" "}
			</div>
			<div className="max-w-[600px] w-full  flex items-center justify-center">
				<Tabs defaultValue="login" onValueChange={(value) => setTab(value)}>
					<TabsList>
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>

					{/* Login Form */}
					<TabsContent value="login">
						<Form {...loginForm}>
							<form
								onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
								className="space-y-6"
							>
								<FormField
									control={loginForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="you@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={loginForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="******"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Login</Button>
							</form>
						</Form>
					</TabsContent>

					{/* Register Form */}
					<TabsContent value="register">
						<Form {...registerForm}>
							<form
								onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
								className="space-y-6"
							>
								<FormField
									control={registerForm.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="yourusername" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={registerForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="you@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={registerForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="******"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Register</Button>
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
