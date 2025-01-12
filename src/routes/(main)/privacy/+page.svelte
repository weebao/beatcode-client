<script lang="ts">
    import { Separator } from "$components/ui/separator";
</script>

<svelte:head>
    <title>Privacy Policy - BeatCode</title>
    <meta
        name="description"
        content="Read the privacy policy of BeatCode, a competitive coding platform. Learn about the data we collect, how we use it, and your choices regarding your information."
    />
</svelte:head>

<main class="mx-auto my-16 max-w-[900px] space-y-6 p-4 text-sm leading-relaxed lg:text-base">
    <!-- PAGE TITLE -->
    <h1 class="mb-2 font-icon text-2xl lg:text-4xl">Privacy Policy</h1>
    <Separator />

    <!-- INTRODUCTION -->
    <section class="space-y-2">
        <p>
            BeatCode (“we,” “our,” or “us”) provides a competitive coding platform accessible at
            <a href="/" class="font-semibold text-primary hover:underline">https://beatcode.dev</a>.
            We are committed to protecting your privacy. This Privacy Policy explains what
            information we collect, how we use it, and what choices you have about it.
        </p>
    </section>

    <!-- DATA COLLECTION -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">1. Data Collection</h2>
        <ul class="list-disc space-y-1 pl-6">
            <li>
                <strong class="font-semibold">Google OAuth Data:</strong> If you choose to sign in via
                Google OAuth, we receive your Google username, display name, email address, and profile
                picture.
            </li>
            <li>
                <strong class="font-semibold">User-Provided Data:</strong> When you register, create
                a profile, or send messages through our platform, you may voluntarily provide personal
                information (e.g., display name, coding preferences).
            </li>
            <li>
                <strong class="font-semibold">Cookies:</strong> We use cookies to manage user sessions,
                remember preferences, and enable certain features.
            </li>
            <li>
                <strong class="font-semibold">Analytics:</strong> We use Google Analytics or similar
                tools to gather anonymized visitor data (e.g., page views, time on site). This helps
                us improve site performance.
            </li>
        </ul>
    </section>

    <!-- USE OF INFORMATION -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">2. Use of Information</h2>
        <ul class="list-disc space-y-1 pl-6">
            <li>
                <strong class="font-semibold">Account &amp; Login:</strong> Your Google OAuth data is
                used to identify you, to display your username or display name in competition rooms,
                and to grant you access to certain functionalities.
            </li>
            <li>
                <strong class="font-semibold">Communication:</strong> Your email may be used to reply
                to messages or send essential notices about your account.
            </li>
            <li>
                <strong class="font-semibold">Game &amp; Competition:</strong> Your profile data (like
                display name) appears to other participants in coding challenges and leaderboards.
            </li>
            <li>
                <strong class="font-semibold">Analytics &amp; Site Improvement:</strong> Aggregated or
                anonymized data helps us understand user behavior and improve features, layouts, or performance.
            </li>
            <li>
                <strong class="font-semibold">No Reselling of Data:</strong> We do not sell or rent your
                personal data.
            </li>
        </ul>
    </section>

    <!-- DATA STORAGE & SHARING -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">3. Data Storage &amp; Sharing</h2>
        <ul class="list-disc space-y-1 pl-6">
            <li>
                <strong class="font-semibold">Storage:</strong> The personal data we collect (including
                your name, email, and profile picture) is stored in our database (unencrypted). Only
                our staff or authorized administrators can access this information.
            </li>
            <li>
                <strong class="font-semibold">No Unauthorized Sharing:</strong> We do not share your
                personal data with outside parties, except when required by law or with third-party processors
                under confidentiality obligations.
            </li>
            <li>
                <strong class="font-semibold">Security Measures:</strong> We use standard security practices
                to protect stored data, but cannot guarantee absolute security.
            </li>
        </ul>
    </section>

    <!-- COOKIES -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">4. Cookies</h2>
        <ul class="list-disc space-y-1 pl-6">
            <li>
                <strong class="font-semibold">Session Cookies:</strong> Used to keep you logged in and
                remember preferences during your session.
            </li>
            <li>
                <strong class="font-semibold">Analytics Cookies:</strong> Google Analytics uses cookies
                to gather anonymized browsing behavior.
            </li>
            <li>
                <strong class="font-semibold">Consent:</strong> By using BeatCode, you consent to the
                use of cookies as described above. You can disable cookies in your browser settings,
                but some features may not function properly.
            </li>
        </ul>
    </section>

    <!-- CHANGES & UPDATES -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">5. Changes &amp; Updates</h2>
        <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page, and if they are significant, we will make reasonable efforts to notify you. Your
            continued use of BeatCode after the posting of changes constitutes your acceptance of
            such changes.
        </p>
    </section>

    <!-- CONTACT -->
    <section class="space-y-2">
        <h2 class="text-base font-semibold lg:text-lg">6. Contact</h2>
        <p>
            If you have questions about this Privacy Policy, you can contact our maintainer Bao Dang
            at <a
                href="mailto:baochidangg@gmail.com"
                class="font-semibold text-primary hover:underline">baochidangg@gmail.com</a
            >.
        </p>
    </section>
</main>
