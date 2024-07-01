import { NextPage } from "next";
import { HomePageComponent } from "@/components/home";
import { AppLayout } from "@/layout";
import { getServerSideAuth } from "@/utils/getServerSideAuth";
import { RouteAuth } from "../../@types";

const HomePage: NextPage = () => {
    return (
        <AppLayout>
            <HomePageComponent />
        </AppLayout>
    );
};

export const getServerSideProps = async (ctx: any) => {
    return await getServerSideAuth(ctx, RouteAuth.LOGGED_OUT);
}

export default HomePage;
