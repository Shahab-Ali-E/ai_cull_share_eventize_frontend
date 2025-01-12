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
                protocol:'https',
                hostname:'ik.imagekit.io'
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
    }
};

export default withNextVideo(nextConfig);