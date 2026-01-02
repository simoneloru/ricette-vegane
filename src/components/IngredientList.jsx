import React, { useState } from 'react';
import { Users, Check } from 'lucide-react';

export default function IngredientList({ ingredients, defaultServings = 2 }) {
    const [servings, setServings] = useState(defaultServings);
    const [checkedItems, setCheckedItems] = useState({});

    const toggleItem = (index) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const scaleIngredient = (text) => {
        // Regex to capture "100" or "1,5" or "1.5" or "1/2" at start of string
        // Matches: Start -> Number/Fraction -> Space -> Rest
        const match = text.match(/^([\d.,/]+)(\s+.*)$/);
        if (!match) return text;

        let numStr = match[1].replace(',', '.'); // Normalize italian comma 1,5 -> 1.5

        // Handle fractions like "1/2" -> 0.5
        if (numStr.includes('/')) {
            const [num, den] = numStr.split('/');
            numStr = parseFloat(num) / parseFloat(den);
        }

        const num = parseFloat(numStr);
        if (isNaN(num)) return text;

        const factor = servings / defaultServings;
        const newNum = Math.round((num * factor) * 10) / 10; // Round to 1 decimal

        // Format back, replacing dot with comma for Italian style if needed, 
        // though standard JS float usually uses dot. Let's keep dot for simplicity or replace back?
        // Let's output with standard dot for consistency, or replace if user wants commas.
        // User used "130 gr", "1,5" etc. Let's keep it simple.

        return `${newNum}${match[2]}`;
    };

    return (
        <div className="ingredients-widget">
            <div className="servings-control">
                <div className="icon">
                    <Users size={18} />
                </div>
                <span className="label">Porzioni:</span>
                <div className="stepper">
                    <button onClick={() => setServings(s => Math.max(1, s - 1))} disabled={servings <= 1}>-</button>
                    <span className="current">{servings}</span>
                    <button onClick={() => setServings(s => s + 1)}>+</button>
                </div>
            </div>

            <ul className="ingredient-list">
                {ingredients.map((ing, idx) => (
                    <li
                        key={idx}
                        className={checkedItems[idx] ? 'checked' : ''}
                        onClick={() => toggleItem(idx)}
                    >
                        <div className="checkbox">
                            {checkedItems[idx] && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className="text">{scaleIngredient(ing)}</span>
                    </li>
                ))}
            </ul>

            <style>{`
        .ingredients-widget {
          background: white;
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-card);
        }
        .servings-control {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            color: var(--color-primary);
            font-weight: 600;
        }
        .stepper {
            display: flex;
            align-items: center;
            background: #f0f0f0;
            border-radius: 50px;
            padding: 4px;
        }
        .stepper button {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: none;
            background: white;
            cursor: pointer;
            font-weight: bold;
            color: var(--color-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stepper button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .stepper .current {
            width: 30px;
            text-align: center;
            font-size: 1.1rem;
        }
        .ingredient-list {
            list-style: none;
        }
        .ingredient-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 10px 0;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .ingredient-list li.checked {
            opacity: 0.5;
            text-decoration: line-through;
        }
        .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-primary);
            background: #fff;
            flex-shrink: 0;
            margin-top: 2px;
        }
        .ingredient-list li.checked .checkbox {
            border-color: var(--color-primary);
            background: #e8f5e9;
        }
      `}</style>
        </div>
    );
}
