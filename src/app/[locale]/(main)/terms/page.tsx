"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto my-10 max-w-5xl p-4">
      <div>
        <TypographyH1>
          MovieVerse Terms and Conditions
        </TypographyH1>
        <div>
          Please read carefully the terms of use of MovieVerse.
        </div>
      </div>
      <div className="flex flex-col gap-6 my-12">
        <section className="flex flex-col gap-6">
          <section>
            <TypographyH1>MovieVerse Brand Assets Terms & Conditions</TypographyH1>
            <TypographyP>
              These Brand Assets Terms & Conditions govern your use of the
              MovieVerse Brand Assets. These Brand Assets Terms & Conditions are
              incorporated by reference into the MovieVerse Materials License
              Agreement (the “Agreement”) that governs the use of the MovieVerse
              Materials and your associated license rights to use the MovieVerse
              Materials.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>Scope of Permitted Use</TypographyH3>
            <TypographyP>
              MovieVerse allows for limited use of its brand assets, such as
              logos, trademarks, and visual elements, for specific purposes
              related to the promotion and discussion of MovieVerse content. Any
              use must be respectful of the brand and not imply endorsement or
              affiliation unless explicitly authorized.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>Restrictions</TypographyH3>
            <TypographyP>
              Unauthorized use, modification, or commercial exploitation of
              MovieVerse brand assets is strictly prohibited. This includes but is
              not limited to:
            </TypographyP>
            <ul>
              <li>Using brand assets in a manner that is misleading.</li>
              <li>
                Claiming ownership or exclusive rights over MovieVerse's brand
                assets.
              </li>
              <li>
                Incorporating MovieVerse's brand assets into any product or
                service.
              </li>
              <li>
                Using brand assets in ways that disparage MovieVerse or its
                content.
              </li>
            </ul>
          </section>
          <section>
            <TypographyH3>Proper Use</TypographyH3>
            <TypographyP>
              When using MovieVerse brand assets, ensure that they are displayed
              correctly, without modification or distortion. Maintain sufficient
              clear space around the assets, and do not use them in any way that
              could be construed as offensive.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>Termination</TypographyH3>
            <TypographyP>
              MovieVerse reserves the right to terminate or restrict the use of
              its brand assets at any time, at its sole discretion, particularly
              if misuse is identified.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>Changes to the Terms</TypographyH3>
            <TypographyP>
              MovieVerse may update these terms from time to time, and any
              changes will be posted on this page. Continued use of MovieVerse
              brand assets after changes are made constitutes acceptance of the
              new terms.
            </TypographyP>
          </section>
        </section>

        <section className="flex flex-col gap-6">
          <section>
            <TypographyH1>MovieVerse Materials License Agreement</TypographyH1>
            <TypographyP>
              This MovieVerse Materials License Agreement governs the use of
              MovieVerse Materials.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>License Grant</TypographyH3>
            <TypographyP>
              Subject to your continued compliance with this Agreement, MovieVerse
              hereby grants you a limited, non-exclusive, revocable,
              non-sublicensable, non-transferable license to use, display and
              distribute the MovieVerse Materials solely in connection with your
              promotion of the MovieVerse platform in the Territory and during
              the Term. You may not, directly or indirectly, use any MovieVerse
              Materials in any manner or for any purpose that is unlawful,
              prohibited by this Agreement, or in any other manner that
              MovieVerse in its sole discretion determines is objectionable. All
              rights not expressly granted herein are reserved by MovieVerse.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>MovieVerse Materials</TypographyH3>
            <TypographyP>
              The term “MovieVerse Materials” means any and all written and
              visual materials provided or made available by MovieVerse under
              this Agreement, including without limitation, still images,
              graphics, text, video, sound recordings, clips or any other
              audiovisual recordings.
            </TypographyP>
          </section>
          <section>
            <TypographyH3>Use of MovieVerse Materials</TypographyH3>
            <TypographyP>
              Your use of the MovieVerse Materials is subject to the following
              requirements:
            </TypographyP>
            <ol>
              <li>
                You will comply with all laws, rules, and regulations
                applicable to your use of the MovieVerse Materials.
              </li>
              <li>
                You will not use the MovieVerse Materials in any manner that is
                false, misleading, defamatory, libelous, or disparaging.
              </li>
              <li>
                You will not use the MovieVerse Materials in connection with
                any product, service, or activity that is illegal or fraudulent.
              </li>
              <li>
                You will not use the MovieVerse Materials in any manner that
                infringes on the intellectual property rights of MovieVerse or
                any third party.
              </li>
              <li>
                You will not use the MovieVerse Materials in any manner that
                is inconsistent with the brand image of MovieVerse.
              </li>
            </ol>
          </section>
          <section>
            <TypographyH3>Termination</TypographyH3>
            <TypographyP>
              MovieVerse may terminate your license to use the MovieVerse
              Materials at any time, for any reason, in its sole discretion.
            </TypographyP>
          </section>
        </section>
      </div>
    </div>
  );
}