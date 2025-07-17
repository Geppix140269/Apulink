// PATH: app/survey-report-template/page.tsx
'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function SurveyReportTemplatePage() {
  const [language, setLanguage] = useState<'en' | 'it'>('en')

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-playfair text-3xl font-bold text-stone-800">
              {language === 'en' ? 'Survey Report Template' : 'Modello Relazione Tecnica'}
            </h1>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
              className="flex items-center space-x-2 text-stone-600 hover:text-terracotta font-medium"
            >
              <span className="text-xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
              <span>{language === 'en' ? 'IT' : 'EN'}</span>
            </button>
          </div>
          <p className="text-stone-600">
            {language === 'en' 
              ? 'Standard template used by our verified surveyors for property assessments in Puglia'
              : 'Modello standard utilizzato dai nostri geometri verificati per le valutazioni immobiliari in Puglia'
            }
          </p>
        </div>
      </div>

      {/* Report Template */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl text-gray-800 text-base leading-relaxed">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <Image 
            src="/APULINK_LOGO-TRASPARENT.png" 
            alt="Apulink SurvEYES™" 
            width={150} 
            height={60}
            className="h-12 w-auto"
          />
          <span className="text-sm text-stone-500">SurvEYES™ Report Template v2.0</span>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">🏷️ Property Survey Report / Relazione Tecnica Immobile</h1>
        
        <section className="mb-6">
          <p><strong>Client / Cliente:</strong> [Nome Cliente]</p>
          <p><strong>Property Address / Indirizzo:</strong> [Indirizzo Immobile]</p>
          <p><strong>Date of Inspection / Data Sopralluogo:</strong> [Data]</p>
          <p><strong>Surveyor / Tecnico:</strong> [Nome e Albo Professionale]</p>
          <p><strong>Reference ID:</strong> [Codice Interno]</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. General Description / Descrizione Generale</h2>
          <ul className="list-disc ml-6">
            <li>Type of property / Tipologia immobile</li>
            <li>Year of construction (if known) / Anno di costruzione</li>
            <li>Intended use / Destinazione d'uso</li>
            <li>General condition / Condizioni generali</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Town Planning & Cadastral Compliance / Conformità Urbanistica e Catastale</h2>
          <ul className="list-disc ml-6">
            <li>Cadastral status: compliant / not compliant</li>
            <li>Building permits, condoni, variations</li>
            <li>Notes on discrepancies / Annotazioni su difformità</li>
            <li>Risk level: 🟢 / 🟡 / 🔴</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Restrictions & Bindings / Vincoli e Limitazioni</h2>
          <ul className="list-disc ml-6">
            <li>Environmental or landscape restrictions?</li>
            <li>Historical building constraints?</li>
            <li>Other special authorizations required?</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Structure &amp; Installations / Struttura e Impianti</h2>
          <ul className="list-disc ml-6">
            <li>Structural condition: cracks, subsidence, etc.</li>
            <li>Electrical system: compliant?</li>
            <li>Plumbing/sewage systems</li>
            <li>Heating / AC systems</li>
            <li>Energy performance</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Renovation Potential & Cost Estimate / Lavori Edili e Costi Stimati</h2>
          <ul className="list-disc ml-6">
            <li>Renovation required? Yes/No</li>
            <li>Estimated cost: € [ ] – € [ ]</li>
            <li>Permits required?</li>
            <li>Eligible for grants (Mini PIA etc.): Yes / No / To be assessed</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Documentation Review / Verifica Documentazione</h2>
          <ul className="list-disc ml-6">
            <li>Title deed / Atto di provenienza</li>
            <li>Plans and permits / Elaborati grafici e autorizzazioni</li>
            <li>EPC / APE</li>
            <li>Missing or unclear documents / Documenti mancanti</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Surveyor&apos;s Summary / Conclusioni del Tecnico</h2>
          <ul className="list-disc ml-6">
            <li>Suitability for purchase:
              <ul className="ml-4">
                <li>🟢 Safe to proceed</li>
                <li>🟡 Proceed with caution</li>
                <li>🔴 High risk, not recommended</li>
              </ul>
            </li>
            <li>Additional recommendations / Raccomandazioni:</li>
          </ul>
        </section>
        
        <section className="mt-8 border-t pt-6">
          <p><strong>Surveyor Signature / Firma del Tecnico:</strong></p>
          <p>[Nome, Albo, Timbro, Firma]</p>
          
          <div className="mt-6 p-4 bg-stone-50 rounded-lg text-sm text-stone-600">
            <p className="font-semibold mb-1">Disclaimer / Dichiarazione di Responsabilità:</p>
            <p>This report is based on visual inspection and available documentation. / 
            Questa relazione è basata su ispezione visiva e documentazione disponibile.</p>
          </div>
        </section>
      </div>

      {/* Additional Information */}
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="bg-terracotta/10 rounded-xl p-6">
          <h3 className="font-playfair text-xl font-semibold text-stone-800 mb-3">
            {language === 'en' ? 'About This Template' : 'Informazioni sul Modello'}
          </h3>
          <p className="text-stone-700 mb-4">
            {language === 'en' 
              ? 'This standardized template ensures all our surveyors provide comprehensive, consistent reports that international buyers can easily understand. The bilingual format helps bridge language barriers.'
              : 'Questo modello standardizzato garantisce che tutti i nostri geometri forniscano relazioni complete e coerenti che gli acquirenti internazionali possano facilmente comprendere. Il formato bilingue aiuta a superare le barriere linguistiche.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-terracotta text-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
              {language === 'en' ? 'Download PDF Template' : 'Scarica Modello PDF'}
            </button>
            <button className="bg-white text-terracotta border-2 border-terracotta px-6 py-3 rounded-lg font-medium hover:bg-terracotta/5 transition-colors">
              {language === 'en' ? 'Request a Survey' : 'Richiedi Sopralluogo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
