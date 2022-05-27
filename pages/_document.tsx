import { ColorModeScript } from "@chakra-ui/react";
import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600;900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
