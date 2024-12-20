import Head from "next/head";
import Header from "@/components/header";
import UserRegisterForm from "@/components/users/UserRegisterForm";
import React from "react";
import withAuth from '@/components/withAuth';

const AddPlayerForm: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register Player</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};
export default withAuth(AddPlayerForm);