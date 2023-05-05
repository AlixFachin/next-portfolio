import { NextPage } from "next";
import Head from "next/head";
import AdminLayout from "@/components/adminLayout";
import AdminPostList from "@/components/CRM/adminPostList";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <AdminLayout>
        <AdminPostList />
      </AdminLayout>
    </>
  );
};

export default Admin;
