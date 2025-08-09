import { projectService, milestoneService, budgetService } from './firestore-service';

export async function seedDemoData(userId: string) {
  try {
    console.log('Starting to seed demo data...');
    
    // Create a demo project
    const projectId = await projectService.createProject({
      name: 'Villa Renovation - Ostuni',
      status: 'in_progress',
      region: 'Puglia',
      comune: 'Ostuni',
      address: 'Via dei Trulli 42, 72017 Ostuni BR',
      description: 'Complete renovation of 18th century villa with pool and olive grove',
      miniPiaStage: 'Permits Approved',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-09-30'),
      ownerId: userId,
      totalBudget: 450000,
      spentBudget: 125000,
      progress: 28
    });

    console.log('Created project:', projectId);

    // Create milestones
    const milestones = [
      {
        projectId,
        title: 'Property Acquisition',
        description: 'Complete purchase and legal transfer',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        progress: 100,
        status: 'completed' as const,
        ownerId: userId
      },
      {
        projectId,
        title: 'Design & Planning',
        description: 'Architectural designs and engineering plans',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-03-15'),
        progress: 100,
        status: 'completed' as const,
        ownerId: userId
      },
      {
        projectId,
        title: 'Permit Applications',
        description: 'Submit and obtain all necessary permits',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-04-30'),
        progress: 75,
        status: 'in_progress' as const,
        ownerId: userId
      },
      {
        projectId,
        title: 'Construction Phase 1',
        description: 'Structural work and foundations',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-06-30'),
        progress: 0,
        status: 'pending' as const,
        ownerId: userId
      },
      {
        projectId,
        title: 'Construction Phase 2',
        description: 'Interior finishing and installations',
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-08-31'),
        progress: 0,
        status: 'pending' as const,
        ownerId: userId
      },
      {
        projectId,
        title: 'Final Inspections',
        description: 'Quality checks and certifications',
        startDate: new Date('2025-09-01'),
        endDate: new Date('2025-09-30'),
        progress: 0,
        status: 'pending' as const,
        ownerId: userId
      }
    ];

    for (const milestone of milestones) {
      await milestoneService.createMilestone(milestone);
    }

    console.log('Created milestones');

    // Create budget items
    const budgetItems = [
      {
        projectId,
        category: 'Acquisition' as const,
        item: 'Property Purchase',
        quantity: 1,
        unit: 'unit',
        unitCost: 180000,
        totalCost: 180000,
        vatRate: 0.1,
        vatAmount: 18000,
        status: 'paid' as const,
        notes: 'Initial property purchase'
      },
      {
        projectId,
        category: 'Design' as const,
        item: 'Architectural Services',
        quantity: 1,
        unit: 'project',
        unitCost: 25000,
        totalCost: 25000,
        vatRate: 0.22,
        vatAmount: 5500,
        status: 'invoiced' as const,
        notes: 'Complete architectural design package'
      },
      {
        projectId,
        category: 'Permits' as const,
        item: 'Building Permits',
        quantity: 1,
        unit: 'set',
        unitCost: 8000,
        totalCost: 8000,
        vatRate: 0.22,
        vatAmount: 1760,
        status: 'paid' as const,
        notes: 'Municipal permits and fees'
      },
      {
        projectId,
        category: 'Works' as const,
        item: 'Structural Reinforcement',
        quantity: 1,
        unit: 'project',
        unitCost: 85000,
        totalCost: 85000,
        vatRate: 0.1,
        vatAmount: 8500,
        status: 'committed' as const,
        notes: 'Foundation and structural work'
      },
      {
        projectId,
        category: 'Works' as const,
        item: 'Roof Restoration',
        quantity: 280,
        unit: 'sqm',
        unitCost: 120,
        totalCost: 33600,
        vatRate: 0.1,
        vatAmount: 3360,
        status: 'planned' as const,
        notes: 'Traditional tile roof restoration'
      },
      {
        projectId,
        category: 'FF&E' as const,
        item: 'Kitchen Installation',
        quantity: 1,
        unit: 'unit',
        unitCost: 35000,
        totalCost: 35000,
        vatRate: 0.22,
        vatAmount: 7700,
        status: 'planned' as const,
        notes: 'High-end kitchen with appliances'
      },
      {
        projectId,
        category: 'Contingency' as const,
        item: 'Project Contingency',
        quantity: 1,
        unit: 'allowance',
        unitCost: 45000,
        totalCost: 45000,
        vatRate: 0,
        vatAmount: 0,
        status: 'planned' as const,
        notes: '10% contingency fund'
      }
    ];

    for (const item of budgetItems) {
      await budgetService.createBudgetItem(item);
    }

    console.log('Created budget items');

    // Create second project
    const project2Id = await projectService.createProject({
      name: 'Trullo Complex - Alberobello',
      status: 'planning',
      region: 'Puglia',
      comune: 'Alberobello',
      address: 'Contrada Popoleto, 70011 Alberobello BA',
      description: 'Restoration of historic trullo complex for boutique accommodation',
      miniPiaStage: 'Initial Survey',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-12-31'),
      ownerId: userId,
      totalBudget: 320000,
      spentBudget: 0,
      progress: 0
    });

    console.log('Created second project:', project2Id);

    console.log('Demo data seeded successfully!');
    return { projectId, project2Id };
  } catch (error) {
    console.error('Error seeding demo data:', error);
    throw error;
  }
}
