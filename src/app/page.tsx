import { InstructionBanner } from '@lutra/app/_components/instruction-banner';
import { HydrateClient, api } from '@lutra/trpc/server';
import PatientCard from './_components/PatientCard';

export default async function Home() {
  const patients = await api.patient.getPatients();

  return (
    <HydrateClient>
      <div className='space-y-4 p-4 sm:p-6 lg:p-8'>
        <InstructionBanner />
        <header>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-lg'>Patients</h3>
          </div>
        </header>
        <main>
          <div className='mt-6'>
            <div className='grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3'>
              {patients.map(patient => (
                <PatientCard
                  key={patient.id}
                  patientId={patient.id}
                  firstName={patient.firstName}
                  lastName={patient.lastName}
                  isActive={patient.isActive}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
