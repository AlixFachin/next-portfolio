import { NextPage } from "next";
import Head from "next/head";
import AdminLayout from "@/components/adminLayout";
import AdminPageList from "@/components/CRM/AdminPageList";

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page List</title>
      </Head>
      <AdminLayout>
        <AdminPageList />
      </AdminLayout>
    </>
  );
};

export default AdminPage;
