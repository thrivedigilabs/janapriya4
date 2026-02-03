import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

type Props = {
  course: any;
};

const SECTION_ORDER = [
  'overview',
  'syllabus',
  'labs',
  'departments',
  'competencies',
];

export const CourseAccordion = ({ course }: Props) => {
  const [openSection, setOpenSection] = useState<string | null>('overview');

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div className="mt-4 space-y-4">
      {SECTION_ORDER.map((key) => {
        const section = course.sections[key];
        if (!section) return null;

        return (
          <div key={key} className="bg-muted rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(key)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <h3 className="font-semibold text-foreground">
                {section.title}
              </h3>
              {openSection === key ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {openSection === key && (
              <div className="px-4 pb-4 space-y-4 text-sm text-muted-foreground">
                {/* OVERVIEW */}
                {key === 'overview' && (
                  <>
                    <p>{section.description}</p>
                    <p><strong>Duration:</strong> {section.duration}</p>
                    {section.system && <p><strong>System:</strong> {section.system}</p>}
                    <p><strong>Eligibility:</strong> {section.eligibility}</p>
                    {section.activities && <p><strong>Activities:</strong> {section.activities}</p>}
                  </>
                )}

                {/* SYLLABUS */}
                {key === 'syllabus' && (
                  <>
                    {(section.semesters || section.years)?.map((sem: any) => (
                      <div key={sem.label}>
                        <p className="font-medium text-foreground">{sem.label}</p>
                        <ul className="list-disc pl-5">
                          {sem.subjects.map((s: string) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {section.internship && (
                      <p><strong>Internship:</strong> {section.internship.duration}</p>
                    )}
                  </>
                )}

                {/* LABS */}
                {key === 'labs' && (
                  <>
                    <p>{section.description}</p>
                    <ul className="list-disc pl-5">
                      {section.items.map((l: string) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* DEPARTMENTS */}
                {key === 'departments' && (
                  <>
                    {section.items.map((d: any) => (
                      <div key={d.name}>
                        <p className="font-medium text-foreground">{d.name}</p>
                        <p>{d.description}</p>

                        {d.aims && (
                          <ul className="mt-2 space-y-1">
                            {d.aims.map((a: string) => (
                              <li key={a} className="flex gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* COMPETENCIES */}
                {key === 'competencies' && (
                  <>
                    {section.items.map((c: any) => (
                      <div key={c.title}>
                        <p className="font-medium text-foreground">{c.title}</p>
                        <p>{c.description}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
