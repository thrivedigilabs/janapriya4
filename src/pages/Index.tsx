import { Layout } from '@/components/layout/Layout';
import { WelcomePopup } from '@/components/WelcomePopup';
import { HeroSlider } from '@/components/home/HeroSlider';

import { ApprovalsBar } from '@/components/home/ApprovalsBar';
import { StatsGrid } from '@/components/home/StatsGrid';
import { FacultiesCarousel } from '@/components/home/FacultiesCarousel';
import { VisionMission } from '@/components/home/VisionMission';
import { AboutPreview } from '@/components/home/AboutPreview';
import { FacultiesGrid } from '@/components/home/FacultiesGrid';
import { LeadershipMessages } from '@/components/home/LeadershipMessages';
import { ProgramsPreview } from '@/components/home/ProgramsPreview';
import { NewsEvents } from '@/components/home/NewsEvents';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <WelcomePopup />
      <HeroSlider />
      
      <ApprovalsBar />
      <StatsGrid />
      <FacultiesCarousel />
      <VisionMission />
      <AboutPreview />
      <FacultiesGrid />
      <LeadershipMessages />
      <ProgramsPreview />
      <NewsEvents />
      <CTASection />
    </Layout>
  );
};

export default Index;
