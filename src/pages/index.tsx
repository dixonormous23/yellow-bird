import { NextPage } from "next";
import { HomePageComponent } from "@/components/home";
import { AppLayout } from "@/layout";

const HomePage: NextPage = () => {
    return (
        <AppLayout>
            <HomePageComponent />
        </AppLayout>
    );
};

export default HomePage;
