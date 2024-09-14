export default function PartyLocationMap() {
    return (
      <div className="w-full lg:w-1/2 p-4 flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496.18463593097323!2d-55.18075289926587!3d5.7880782273638385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d09ca4d666e7731%3A0x485bddad8ba5a4b7!2sLikanoe%20St%2C%20Paramaribo%2C%20Suriname!5e0!3m2!1sen!2s!4v1726337957698!5m2!1sen!2s"
          className="w-full h-64" // Ensuring proper width and height
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }
  