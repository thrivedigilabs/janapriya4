import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitLeadToGoogleSheet } from '@/config/googleSheets';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    await submitLeadToGoogleSheet({
      formType: 'contact',
      timestamp: new Date().toISOString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    });

    toast({ title: "Message Sent", description: "We'll get back to you soon!" });
    setIsSubmitting(false);
    e.currentTarget.reset();
  };

  return (
    <Layout>
      <PageHero title="Contact Us" subtitle="Get in Touch with Us" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label>Name *</Label><Input name="name" required className="mt-1" /></div>
                  <div><Label>Email *</Label><Input name="email" type="email" required className="mt-1" /></div>
                </div>
                <div><Label>Phone</Label><Input name="phone" type="tel" className="mt-1" /></div>
                <div><Label>Subject *</Label><Input name="subject" required className="mt-1" /></div>
                <div><Label>Message *</Label><Textarea name="message" required className="mt-1" rows={4} /></div>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              
              {/* Hassan Campus */}
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-semibold text-lg text-primary mb-4">Hassan Campus</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent-dark mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">College Address</h4>
                      <p className="text-muted-foreground text-sm">Plot No. 503/A, KIADB Growth Center, H N Pura Road, Hassan</p>
                      <h4 className="font-medium text-foreground mt-2">Office Address</h4>
                      <p className="text-muted-foreground text-sm">4th Floor, Janapriya Hospital, Shankarmutt Road, Hassan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-accent-dark mt-1" />
                    <div><h4 className="font-medium text-foreground">Phone</h4><a href="tel:+919900747923" className="text-muted-foreground text-sm hover:text-primary">+91 99007 47923</a></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-accent-dark mt-1" />
                    <div><h4 className="font-medium text-foreground">Email</h4><a href="mailto:janapriyaconhassan@gmail.com" className="text-muted-foreground text-sm hover:text-primary">janapriyaconhassan@gmail.com</a></div>
                  </div>
                </div>
              </div>

              {/* Mangalore Campus */}
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-semibold text-lg text-primary mb-4">Mangalore Campus</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent-dark mt-1" />
                    <div><h4 className="font-medium text-foreground">Address</h4><p className="text-muted-foreground text-sm">Padil, Mangaluru, Karnataka 575007</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-accent-dark mt-1" />
                    <div><h4 className="font-medium text-foreground">Phone</h4><a href="tel:+919148247799" className="text-muted-foreground text-sm hover:text-primary">+91 91482 47799</a></div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl overflow-hidden h-64">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2!2d74.84!3d12.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUyJzEyLjAiTiA3NMKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
