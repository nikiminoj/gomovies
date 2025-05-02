"use client";
import * as motion from "motion/react-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/typography";

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto my-10 max-w-5xl p-4">
        <div>
          <TypographyH1 className="text-2xl font-bold">GoMovies Privacy Statement</TypographyH1>
          <div>
            <div className="space-y-6">
              <TypographyP className="text-md text-gray-600">
                This Privacy Statement explains how we collect, use, and disclose
                your personal information when you use the "MovieVerse platform"
                (that term and “MovieVerse content” are defined in the MovieVerse
                Terms of Use) or anywhere we display or reference this Privacy.
                Statement. It also explains what privacy rights you have and how
                to exercise them.
              </TypographyP>
              <TypographyH3>Contacting Us</TypographyH3>
              <TypographyP>
                For questions about this Privacy Statement, our use of your
                personal information, or how to exercise your privacy rights,
                please contact our Data Protection Officer/Privacy Office at
                privacy@movieverse.com. For general questions about the
                MovieVerse platform, your subscription, or how to contact customer
                service, please visit help.movieverse.com.
              </TypographyP>
              <TypographyP className="text-md text-gray-600">
                Information about the specific MovieVerse entity (or entities)
                that are responsible for your personal information (known as the
                “data controller” in certain countries) is available at movieverse.com/legal/corpinfo.

              </TypographyP>
              <TypographyH3>Section A: Our Collection, Use, and Disclosure of Personal Information</TypographyH3>
              <TypographyH4>The Categories of Personal Information We Collect</TypographyH4>
              <p>We collect the following categories of personal information about you:</p>
              <ul>
                <li>
                  <b>Personal details:</b> When you create your MovieVerse
                  subscription, we collect your contact information (such as your
                  email address) and authentication information for your login
                  (such as a password). Depending on how you subsequently set up
                  your subscription and method of payment, and which features you
                  use, we also collect one or more of the following: first and
                  last name, phone number, postal address, gender, date of birth,
                  and other identifiers you provide to us.
                </li>
                <li>
                  <b>Payment details:</b> We collect your payment details, and
                  other information to process your payments, including your
                  payment history and billing address.
                </li>
                <li>
                  <b>Purchase information:</b> We collect purchase information
                  such as information you provide to us when you make a purchase
                  with MovieVerse, your purchase history, and overall purchase
                  habits.
                </li>
                <li>
                  <b>MovieVerse subscription/profile information:</b> We collect
                  information that is associated with your MovieVerse subscription
                  and/or MovieVerse profiles on your subscription (such as profile
                  name and icon, ratings and feedback you provide for MovieVerse
                  content), “My List” (watch list of titles), “continue watching”
                  information, subscription/profile settings, and choices in
                  connection with your use of the MovieVerse platform.
                </li>
                <li>
                  <b>Usage information:</b> We collect information about your
                  interaction with the MovieVerse platform (including playback
                  events, such as play, pause, etc.), your MovieVerse viewing
                  history, search queries on the MovieVerse platform, and other
                  information about your use and interaction with the MovieVerse
                  platform (such as app clicks, text input, page views, time and
                  duration of access).
                </li>
                <li>
                  <b>Device and network information:</b> We collect information
                  about your computer or other MovieVerse capable devices you
                  might use to access our platform (such as smart TVs, mobile
                  devices), your network, and network devices. The information
                  includes IP addresses (which can be used to tell us the general
                  location of your device, such as your city, state/province, and
                  postal code); device and software characteristics (such as type
                  and configuration), referring source (for example, referrer
                  URLs), standard web browser and mobile app log information, and
                  connection information including type (such as wifi or
                  cellular); performance data such as crash reports, timestamps,
                  and debug log messages.
                </li>
                <li>
                  <b>Communications:</b> If you communicate with MovieVerse (such
                  as contacting customer support via online chat or voice call),
                  or engage in our surveys or feedback requests, we collect the
                  contents of such communications. We also collect details of
                  communications that we send you (such as via email, push
                  notifications, text message, or within the MovieVerse platform),
                  and information about your interaction with these
                  communications.
                </li>
              </ul>


              <TypographyH3>How We Use Your Personal Information</TypographyH3>
              <p>
                We use the personal information we collect to enhance your experience on the MovieVerse platform and to ensure the quality of our service. Here’s how we use your data:
              </p>
              <br />
              <ul>
                <li>
                  <b>Improving Our Platform:</b> We analyze user behavior and preferences to understand what our audience enjoys, allowing us to continuously improve our content library and the functionality of our platform.
                </li>
                <li>
                  <b>Personalizing Your Experience:</b> We personalize your experience by tailoring the platform to your viewing habits. This includes remembering where you left off in a series or movie, as well as presenting content in a way that suits your preferences.
                </li>
                <li>
                  <b>Recommending Movies and Series:</b> We use your viewing history, ratings, and other interactions to recommend movies and series that we believe you will love. Our recommendations are designed to help you discover new content that matches your taste.
                </li>
                <li>
                  <b>Sending Updates and News:</b> We use your information to send you updates about new movies and series, as well as important service announcements.
                </li>
              </ul>
              <br />
              <br />

              <TypographyH3>Who We Disclose Personal Information To</TypographyH3>
              <p>
                We may disclose your personal information to the following parties:
              </p>



              <TypographyH4>Where We Collect Personal Information From</TypographyH4>
              <p>We collect your personal information from the following sources:</p>
              <ul>
                <li>
                  <b>Directly from you:</b> When you register with the MovieVerse
                  platform, update your MovieVerse subscription or profile,
                  purchase products or services from us, correspond with us, or
                  respond to our surveys, you may provide (and we will collect)
                  the following categories of personal information: personal
                  details, payment details, purchase information, MovieVerse
                  subscription/profile information, and communications.
                </li>
                <li>
                  <b>Automatically when you use our platform:</b> We
                  automatically collect the following categories of personal
                  information in connection with your use of the MovieVerse
                  platform: MovieVerse subscription/profile information, purchase
                  information, usage information, device and network information,
                  and communications.
                </li>
                <li>
                  <b>From other sources:</b> We may collect the following
                  categories of personal information about you from other sources:
                  personal details, payment details, and device and network
                  information. These sources include: Service Providers such as
                  vendors, agents, and contractors that collect or provide
                  personal information to MovieVerse in connection with services
                  they perform on our behalf (“Service Providers”).
                </li>
              </ul>
              <br />

              <TypographyH3>Section B: Your Rights and Controls</TypographyH3>
              <br />
              <TypographyH4>Your Privacy Rights</TypographyH4>
              <br />
              <p>
                Access, correct, update, or delete your personal information: You have a right to confirm whether we process your personal information and to access and receive a copy of the personal information we process about you. You may also correct or update out-of-date or inaccurate personal information or request that we delete personal information that we hold about you.
              </p>
              <p>
                To request a copy of your personal information, please visit movieverse.com/subscription/getmyinfo. In addition, under the "Subscription" section of our website, you can access and update information about your subscription, including your contact information, payment information, and various related information about your subscription. You must be logged in to access the "Subscription" section.
              </p>
              <ul>
                <li>
                  To provide our platform including making personalized
                  recommendations for MovieVerse content (movies, series,
                  episodes) that we think will be of interest to you. This may
                  also include personalizing and optimizing the features and
                  functionalities of the platform (such as the way in which
                  the recommendations are presented to you), and localizing
                  MovieVerse content relevant to your geography in compliance with our
                  content partners’ licensing terms. We use the following
                  categories of personal information for this purpose: personal
                  details, MovieVerse subscription/profile information, purchase
                  information, usage information, device and network information,
                  and communications.
                </li>
                <li>
                  To administer and operate our business including purposes
                  such as processing payments, sending transactional
                  communications to you (such as confirmation of subscription
                  start date or information about changes to your subscription),
                  determining your internet service provider to support network
                  troubleshooting issues, responding to your inquiries and
                  requests, and assisting you with operational requests such as
                  password resets. We use the following categories of personal
                  information for this purpose: personal details, payment
                  details, purchase information, MovieVerse subscription/profile
                  information, usage information, device and network information,
                  and communications.
                </li>
                <li>
                  To research, analyze, and improve our platforms such as analyzing
                  and understanding our audience to improve our platforms and
                  optimize MovieVerse content selection and platform delivery.
                  This may also include processing your personal information in
                  connection with any surveys you participate in.
                  We use the following categories of personal information for this
                  purpose: personal details, payment details, purchase
                  information, MovieVerse subscription/profile information, usage
                  information, device and network information, and
                  communications.
                </li>
                <li>
                  To send marketing and informational messages including news
                  and promotional communications about our platform, new
                  features, available MovieVerse content, and special offers.
                  Any of these messages may be personalized for you or your
                  likely interests. Please see the section “Communication
                  Preferences” below to change your communications preferences.
                  Depending on the nature of the message we send, we may
                  use the following categories of personal information for this
                  of the message we send, we may use the following categories of
                  personal information for this purpose: personal details,
                  MovieVerse subscription/profile information, purchase
                  information, usage information, device and network information,
                  and communications.
                </li>
                <li>
                  For safety, security, and fraud prevention including to
                  secure our systems, protect our business, and to investigate,
                  prevent, and detect prohibited or illegal activities and
                  other security/technical issues. We use the following
                  categories of personal information for this purpose: personal details, payment
                  details, MovieVerse subscription/profile information, usage
                  information, device and network information, and
                  communications.
                </li>
                <li>
                  To comply with law and enforce the MovieVerse Terms of Use
                  including to satisfy applicable law, regulation, legal process,
                  or governmental request, and to protect against harm to the
                  rights, property or safety of MovieVerse, its users or the
                  public, as required or permitted by law, and to enforce
                  applicable community guidelines. We use the following categories
                  of personal information for this purpose: personal details,
                  payment details, MovieVerse subscription/profile information,
                  usage information, device and network information, and
                  communications.
                </li>
              </ul>


              <TypographyH3>Your Choices</TypographyH3>
              <br />
              <TypographyH4 className="text-lg font-semibold">Content Preferences</TypographyH4>
              <p>
                MovieVerse provides you with control over how we suggest movies and series to you. You can manage these preferences as follows:
              </p>
              <ul>
                <li>
                  <b>Managing Your Viewing History:</b> You can view and manage your watch history on MovieVerse through the "Profiles & Parental Controls" section under your subscription. This allows you to remove titles that you have previously watched and that you do not want to influence future recommendations.
                </li>
                <li>
                  <b>Tailoring Movie and Series Suggestions:</b> By rating movies and series you have watched, you help us refine our recommendations to better match your tastes. You can rate content through the MovieVerse platform to enhance your experience.
                </li>
              </ul>
              <br />
              <br />
              <TypographyH4 className="text-lg font-semibold">Communication Preferences</TypographyH4>
              <p>
                You have the ability to choose what types of communications you receive from us, including emails and text messages. Here’s how you can manage your preferences:
              </p>

              <ul>
                <li>
                  <b>Email and Text Messages:</b> If you no longer want to receive certain communications from us via email or text message, please access the “Notification settings” option for the relevant profile within the “Subscription” section of our website. Alternatively, click the “unsubscribe” link in the email or reply STOP (or as otherwise instructed) to the text message (note: you may receive a confirmation text message in this case).
                </li>
                <li>
                  Please note that you cannot unsubscribe from transactional messages from us, such as messages relating to your subscription transactions.
                </li>
              </ul>
              {/* Add more content as needed */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}