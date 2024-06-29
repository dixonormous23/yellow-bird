import { NextPage } from "next";
import { HomeComponent } from "@/components/home";
import { AppLayout } from "@/layout";

const HomePage: NextPage = () => {
    return (
        <AppLayout>
            <HomeComponent />
        </AppLayout>
    );
};

export default HomePage;
