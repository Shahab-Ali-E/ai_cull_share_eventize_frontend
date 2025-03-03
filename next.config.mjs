import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'s3.eu-north-1.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com', 
            },
            {
                protocol:"https",
                hostname:"api.aicullshareeventizebackend.online"
            }
        ]
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        });
        return config;
    },
    
};

export default withNextVideo(nextConfig);