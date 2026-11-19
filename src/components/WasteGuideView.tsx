import React, { useState } from 'react';
import { ArrowLeft, Clock, Leaf, Recycle, AlertTriangle, Lightbulb } from 'lucide-react';
import { BINS, WASTE_ITEMS, WasteCategory, WasteItem } from '../data/wasteItems';
import { WasteIllustration } from './WasteIllustration';
import { soundEngine } from '../utils/sound';

interface WasteGuideViewProps {
  onBack: () => void;
  onStartGame: () => void;
}

export const WasteGuideView: React.FC<WasteGuideViewProps> = ({
  onBack,
  onStartGame,
}) => {
  const [filter, setFilter] = useState<'all' | WasteCategory>('all');
  const [selectedItem, setSelectedItem] = useState<WasteItem>(WASTE_ITEMS[0]);

  const filteredItems =
    filter === 'all'
      ? WASTE_ITEMS
      : WASTE_ITEMS.filter((item) => item.category === filter);

  const selectedBin = BINS[selectedItem.category];

  const getCategoryIcon = (cat: WasteCategory) => {
    if (cat === 'organik') return <Leaf className="w-4 h-4 text-emerald-700" />;
    if (cat === 'anorganik') return <Recycle className="w-4 h-4 text-amber-700" />;
    return <AlertTriangle className="w-4 h-4 text-red-700" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 active:scale-95 transition-transform whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kamus Sampah IPAS Kelas 4
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Sentuh gambar sampah untuk membaca penjelasan dan cara pengelolaannya.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onStartGame();
          }}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-sm active:scale-95 transition-transform whitespace-nowrap shrink-0 cursor-pointer"
        >
          Mulai Bermain
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit mb-6">
        {(
          [
            { id: 'all', label: 'Semua Sampah (18)' },
            { id: 'organik', label: 'Organik (6)' },
            { id: 'anorganik', label: 'Anorganik (6)' },
            { id: 'b3', label: 'B3 Berbahaya (6)' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter(tab.id);
              const firstMatch =
                tab.id === 'all'
                  ? WASTE_ITEMS[0]
                  : WASTE_ITEMS.find((i) => i.category === tab.id);
              if (firstMatch) setSelectedItem(firstMatch);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filter === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-Column Split: Grid of Items + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const isSelected = selectedItem.id === item.id;
            const bin = BINS[item.category];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedItem(item);
                }}
                className={`flex flex-col items-center p-4 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  isSelected
                    ? `bg-white ${bin.borderClass} ring-4 ring-emerald-200 shadow-md -translate-y-0.5`
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <WasteIllustration id={item.id} className="w-20 h-20 mb-2" />
                <span className="font-display font-bold text-slate-900 text-base leading-snug">
                  {item.name}
                </span>
                <span className={`text-xs font-semibold mt-1 ${bin.textClass}`}>
                  {bin.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky Detail Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
            <div className="shrink-0 p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <WasteIllustration id={selectedItem.id} className="w-24 h-24" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600 mb-1">
                {getCategoryIcon(selectedItem.category)}
                <span className={selectedBin.textClass}>{selectedBin.label}</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                {selectedItem.name}
              </h3>
            </div>
          </div>

          <div className="space-y-4 mt-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Mengapa masuk tong {selectedBin.shortTitle.toLowerCase()}?
              </h4>
              <p className="text-base text-slate-800 leading-relaxed font-medium">
                {selectedItem.explanation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-500">
                  Waktu Terurai di Alam
                </div>
                <div className="text-base font-bold text-slate-900">
                  {selectedItem.decompositionTime}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-800">
                  Aksi Pelajar Peduli Lingkungan (3R)
                </div>
                <div className="text-base font-medium text-emerald-950 leading-relaxed">
                  {selectedItem.ecoTip}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
