import { Hydrate, QueryClientProvider } from "react-query";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { queryClient } from "../src/api";
import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
            <ModalsProvider>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Hydrate>
                </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>

    );
}

export default MyApp;