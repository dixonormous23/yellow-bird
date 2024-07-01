import { USER_COOKIE_KEY } from "@/constants";
import { RouteAuth } from "../../@types";

// Checks for user token after a user has logged in and handles routing / redirects accordingly
// Still needs proper token verification
export const getServerSideAuth = async (ctx: any, routeAuth: RouteAuth) => {
    const baseHeaders = ctx.req.headers.cookie;

    const cookies = baseHeaders?.split('; ').reduce((prev: any, curr: any) => {
        const [name, ...value] = curr.split('=');
        prev[name] = value.join('=');
        return prev;
    }, {});

    const userToken = (cookies ?? {})[USER_COOKIE_KEY] ?? null;

    switch (routeAuth) {
        case RouteAuth.LOGGED_IN:
            if (!userToken) {
                if (!userToken) {
                    ctx.res.writeHead(302, { Location: '/' });
                    ctx.res.end();

                    return { props: {} };
                }
                return { props: {} };
            }
            return { props: {} };
        case RouteAuth.LOGGED_OUT:
            if (userToken) {
                ctx.res.writeHead(302, { Location: '/chat' });
                ctx.res.end();

                return { props: {} };
            }
            return { props: {} };

    };
}
