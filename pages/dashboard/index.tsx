import { GetServerSideProps } from "next";
import { Auth } from "service/axios";

const Dashboard = () => {
    return <div></div>;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await Auth.DASHBOARD(context);
    console.log(data);

    return { props: { fallbackData: data } };
};
