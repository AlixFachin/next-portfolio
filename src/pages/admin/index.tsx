import { NextPage } from "next";
import Head from "next/head";
import AdminPostList from "@/components/CRM/admin";
import AdminLayout from "@/components/adminLayout";

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
