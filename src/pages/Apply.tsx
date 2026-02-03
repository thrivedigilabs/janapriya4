import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitLeadToGoogleSheet } from '@/config/googleSheets';

const undergraduatePrograms = [
  'B.Sc Nursing (4 Years)',
  'Bachelor of Physiotherapy (BPT)',
  'B.Sc Medical Laboratory Technology',
  'B.Sc Emergency Medical Technology',
  'B.Sc Allied Health Sciences',
];

const diplomaPrograms = [
  'GNM - General Nursing & Midwifery',
  'DMLT - Diploma in Medical Lab Technology',
  'D.OTT - Diploma in Operation Theatre Technology',
  'CNA - Certified Nursing Assistant',
  'Phlebotomy Technician',
];

const Apply = () => {
  const { toast } = useToast();
  const [programType, setProgramType] = useState<'undergraduate' | 'diploma'>('undergraduate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    await submitLeadToGoogleSheet({
      formType: 'application',
      timestamp: new Date().toISOString(),
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfBirth: formData.get('dob') as string,
      gender: selectedGender,
      programType: programType,
      program: selectedProgram,
      qualification: selectedQualification,
      percentage: formData.get('percentage') as string,
      previousInstitution: formData.get('school') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      pincode: formData.get('pincode') as string,
    });

    toast({
      title: "Application Submitted",
      description: "We have received your application. Our admissions team will contact you shortly.",
    });
    setIsSubmitting(false);
    e.currentTarget.reset();
    setSelectedGender('');
    setSelectedProgram('');
    setSelectedQualification('');
  };

  return (
    <Layout>
      <PageHero title="Apply Now" subtitle="Start Your Journey in Healthcare" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Program Type Toggle */}
            <div className="flex gap-2 mb-8 p-2 bg-secondary rounded-lg">
              <button
                onClick={() => setProgramType('undergraduate')}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all ${
                  programType === 'undergraduate'
                    ? 'bg-primary text-primary-foreground shadow-premium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Undergraduate Programs
              </button>
              <button
                onClick={() => setProgramType('diploma')}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all ${
                  programType === 'diploma'
                    ? 'bg-primary text-primary-foreground shadow-premium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Diploma Programs
              </button>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-secondary rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {programType === 'undergraduate' ? 'Undergraduate' : 'Diploma'} Application Form
              </h2>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" required className="mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" required className="mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" name="dob" type="date" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Academic Information</h3>
                
                <div>
                  <Label htmlFor="program">Program *</Label>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {(programType === 'undergraduate' ? undergraduatePrograms : diplomaPrograms).map((program) => (
                        <SelectItem key={program} value={program}>{program}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="qualification">Highest Qualification *</Label>
                    <Select value={selectedQualification} onValueChange={setSelectedQualification} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10th">10th Standard</SelectItem>
                        <SelectItem value="12th">12th Standard / PUC</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="degree">Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="percentage">Percentage / CGPA *</Label>
                    <Input id="percentage" name="percentage" placeholder="e.g., 75% or 7.5 CGPA" required className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="school">Previous Institution Name *</Label>
                  <Input id="school" name="school" required className="mt-1" />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Address</h3>
                
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea id="address" name="address" required className="mt-1" rows={3} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" name="pincode" required className="mt-1" />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our terms and conditions. 
                  Our admissions team will contact you within 2-3 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
