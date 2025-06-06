import { Link } from "@/i18n/navigation";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming you have a utils file with cn for class merging
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations("HomePage");

  return (
    <footer className="p-4 mt-8">
      <div className="container mx-auto">
        <p className="text-gray-400">{t("footer.questions")}</p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4 text-gray-400">
          <ul>
            <li>
              <Link href="/faq" className={cn("text-muted-foreground hover:text-foreground")}>
                {t("footer.faq")}
              </Link>
            </li>
            <li><a href="#">{t("footer.account")}</a></li>
            <li><a href="#">{t("footer.mediaCenter")}</a></li>
            <li><a href="#">{t("footer.cookiePreferences")}</a></li>
          </ul>
          <ul>
            <li><a href="#">{t("footer.corporateInformation")}</a></li>
            <li>
              <Link href="/contact" className={cn("text-muted-foreground hover:text-foreground")}>
                {t("footer.contactUs")}
              </Link>
            </li>
            <li><Link href="/privacy" className={cn("text-muted-foreground hover:text-foreground")}>{t("footer.privacy")}</Link></li>
            <li><Link href="/terms" className={cn("text-muted-foreground hover:text-foreground")}>{t("footer.termsOfUse")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}