import React from "react";
import Background from "../Components/Background";

export default function TermsAndConditions() {
  return (
    <div>
      <div className="mt-20 ">
        <Background type={"default"} show="no" />
        <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
          <h1 className="w-full text-center text-6xl font-normal text-black mt-8">
            Terms & Conditions
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-10 my-10 text-justify">
        <div>
          <h6 className="text-2xl font-medium">1.Terms of Use</h6>
          <p className="p-4 text-justify text-base font-light">
            These Terms of Use (“Terms of Use”) govern your access to and use of
            the Services provided by Menoka Enterprises (“Company”) through its
            website (www.etendermitra.in), mobile applications and other related
            services (collectively, the “Services”). By using the Services, you
            agree to these Terms of Use. etendermitra.in recognizes the
            importance of maintaining your privacy. We value your privacy and
            appreciate your trust in us. By visiting or using our Website, you
            agree to this Privacy Policy.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">2. Acceptance of Terms</h6>
          <p className="p-4 text-justify text-base font-light">
            By using our Services, you acknowledge that you have read,
            understood and knowingly agree to these Terms of Use. If you do not
            agree to these Terms, please do not use our Services.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">3. Scope of Use</h6>
          <p className="p-4 text-justify text-base font-light">
            You may use the Website and Mobile Applications only to access and
            use the Services provided by the Company. You will not interfere
            with the operation of the Website and Mobile Applications, attempt
            to gain unauthorized access to our servers, or engage in any harmful
            activity. You are responsible for timely payment to the Company in
            accordance with these Terms of Use, including any applicable taxes
            or fees. You must comply with all applicable laws and regulations
            when using our Services.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">4. Changes and Amendments</h6>
          <p className="p-4 text-justify text-base font-light">
            The Company reserves the right to make changes to the Website,
            Services, and Terms of Use at any time and without notice. Such
            changes will be effective upon posting on the Website and Mobile
            Applications. Your continued use of the Services following such
            changes will be deemed acceptance of the modified Terms of Use.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">5. Fees, Payments, and Taxes</h6>
          <p className="p-4 text-justify text-base font-light">
            The Company may charge fees for certain Services and may change
            these fees at its sole discretion without prior notice. If there is
            an undercharge for technical or other reasons, the Company reserves
            the right to deduct the balance at a later time. Payments to the
            Company may be made through various methods specified on the Website
            and Mobile Applications. You agree to the terms and conditions of
            the payment gateways you use.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">
            6. Refund/Cancellation Policy
          </h6>
          <p className="p-4 text-justify text-base font-light">
            Please review our refund policy before subscribing to our services.
            Subscription services cannot be cancelled and charges are
            non-refundable once the account is activated. The Company is not
            responsible for delayed information, missed tenders or errors in the
            information provided.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">7. Information We Collect</h6>
          <p className="p-4 text-justify text-base font-light">
            Contact Information. We may collect your name, email address, mobile
            number, street, city, district, state, pin code, country and IP
            address.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">8. Payment-Related</h6>
          <p className="p-4 text-justify text-base font-light">
            Payment and Billing Information. We may collect your billing name,
            billing address and payment method when you place an order. We never
            collect your credit card number or credit card expiration date or
            other details related to your credit card on our website. Credit
            card information will be received and processed by our online
            payment partner RazorPay.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">
            9. We collect information in various ways.
          </h6>
          <p className="p-4 text-justify text-base font-light">
            We collect information directly from you. We collect information
            directly from you when you place your order. We collect information
            if you post a comment on our website or ask us a question by phone
            or email.
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">
            10. Use of your personal information
          </h6>
          <ul className="p-4 text-justify text-base font-light list-disc">
            <li>
              We use information to contact you: We may use the information you
              provide to contact you on our website to confirm purchases or for
              other promotional purposes.
            </li>
            <li>
              We use information to respond to your requests or questions. We
              may use your information to confirm that you have placed your
              order.
            </li>
            <li>
              We use information to improve our products and services. We may
              use your information to customize your experience with us. This
              may include displaying content based on your preferences.
            </li>
            <li>
              We use information for security purposes. We may use information
              to protect our company, our customers, or our websites.
            </li>
            <li>
              We use information to send you transaction-related communications.
              We may send you emails or SMS about your account or orders you
              have placed.
            </li>
          </ul>
        </div>
        <div>
          <h6>11. Updates to this Policy</h6>
          <p className="p-4 text-justify text-base font-light">
            We may update this Privacy Policy periodically. Please review it
            from time to time for changes.
          </p>
        </div>
        <div>
          <h6>12. Right to suspend or terminate accounts</h6>
          <p className="p-4 text-justify text-base font-light">
            We reserve the right to suspend or terminate accounts that violate
            these terms
          </p>
        </div>
        <div>
          <h6 className="text-2xl font-medium">13. Governing Law</h6>
          <p className="p-4 text-justify text-base font-light">
            These terms are governed by the laws of West Bengal, India.
          </p>
        </div>
        <p>
          For queries, contact us at
          <a href="#" className="text-[#0554F2]">
            demo@tender.in
          </a>
        </p>
      </div>
    </div>
  );
}
