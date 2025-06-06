/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import("next").NextConfig} */
const config = {
    allowedDevOrigins: ["3000-idx-gomovies-1744779196806.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev"],
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(config);
