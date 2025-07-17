"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


interface SettingsPageProps {
}

const personalInformationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }).optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }).optional(),
});

const changeEmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  confirmEmail: z.string().email({ message: "Please enter a valid email address." }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails must match.",

  path: ["confirmEmail"],
});

type PersonalInformationFormValues = z.infer<typeof personalInformationSchema>;
type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

const SettingsPage: React.FC<SettingsPageProps> = (props) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);


  const personalInformationForm = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const changeEmailForm = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  async function onSubmitPersonalInformation(data: PersonalInformationFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/change-user-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Success", {
          description: "Your first/last name has been updated",
        });
      } else {
        const errorData = await response.json();
        toast.error("Error", {
          description: errorData.error || 'An error occurred',
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }


  async function onSubmitChangeEmail(data: ChangeEmailFormValues) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail: data.email }),
      });

      if (response.ok) {
        toast("Success Email changed successfully!");
        setOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to change email.");
      }
    } catch (err: any) {
      console.log(err);

      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!session) return <></>;

  return (
    <div className="container mx-auto p-4">
      <section className="mb-6 space-y-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <Card>
          <CardContent>
            <Form {...personalInformationForm}>
              <form onSubmit={personalInformationForm.handleSubmit(onSubmitPersonalInformation)} className="space-y-8">
                <FormField
                  control={personalInformationForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInformationForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row justify-end">
                  <Button type="submit" disabled={!personalInformationForm.formState.isValid || isSubmitting} >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="email">Email</Label>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <span
                      className={cn(
                        buttonVariants({
                          variant: "link",
                        })
                      )}
                    >
                      Change Email
                    </span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <Form {...changeEmailForm}>
                      <form onSubmit={changeEmailForm.handleSubmit(onSubmitChangeEmail)}>
                        <DialogHeader>
                          <DialogTitle>Change email</DialogTitle>
                          <DialogDescription>
                            Change your current email address.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Label htmlFor="email">Email</Label>
                          <Input type="email" id="email" placeholder="Enter your new email"
                            {...changeEmailForm.register("email")} />
                          {changeEmailForm.formState.errors.email && (
                            <>
                              <p className="text-red-500 text-sm">{changeEmailForm.formState.errors.email.message}</p>
                            </>
                          )}
                        </div>
                        <div className="grid gap-4 py-4">
                          <Label htmlFor="confirmEmail">Confirm Email</Label>
                          <Input type="email" id="confirmEmail" placeholder="Confirm your email"
                            {...changeEmailForm.register("confirmEmail")} />
                          {changeEmailForm.formState.errors.confirmEmail && (
                            <p className="text-red-500 text-sm">{changeEmailForm.formState.errors.confirmEmail.message}</p>
                          )}
                        </div>

                        <DialogFooter>
                          <Button type="submit" disabled={!changeEmailForm.formState.isValid || isLoading}>{isLoading ? 'Loading...' : 'Save'}</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              <Input type="email" id="email" placeholder="Enter your email" readOnly value={session.user.email ?? ""} />
            </div>
          </CardContent>
          <CardContent className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="space-y-2 md:col-span-1">
              <div className="flex flex-row items-center justify-between">

              </div>
            </div>
            <div className="space-y-2 md:col-span-1">

            </div>
          </CardContent>
        </Card>
      </section>
    </div >
  );
};

export default SettingsPage;