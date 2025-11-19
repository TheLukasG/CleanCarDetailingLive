import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "18",
    ssgName: "gatsby",

    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: "Page",
                    type: "page",
                    urlPath: "/{slug}",
                    filePath: "content/pages/{slug}.json",
                    fields: [
                        { name: "title", type: "string", required: true }
                    ]
                }
            ]
        })
    ],

    postInstallCommand: "npm i --no-save @stackbit/types"
});
siteMap: ({ documents }) => {
        return documents
            .filter(doc => doc.modelName === "Page")
            .map(doc => ({
                stableId: doc.id,
                urlPath: `/${doc.slug}`,
                documentId: doc.id
            }));
    },

    postInstallCommand: "npm i --no-save @stackbit/types"
});
