/**
 * GoNL - Netto Salary Calculator 2026 Engine
 * 
 * Vypočítá čistou mzdu v Nizozemsku za týden dle zadaných parametrů pro rok 2026,
 * včetně přesčasů, 8% dovolené a ET Regeling.
 * 
 * @param {Object} input - Vstupy pro kalkulaci
 * @param {number} input.hourlyRate - Hrubá hodinová sazba (např. 14.50)
 * @param {number} input.hoursWorked - Počet odpracovaných hodin za týden
 * @param {number} input.age - Věk pracovníka (pro aplikaci Jeugdloon)
 * @param {number} [input.housingCostWeekly=135] - Týdenní srážka za ubytování
 * @param {number} [input.insuranceCostWeekly=38.5] - Týdenní srážka za pojištění
 * @param {number} [input.zorgtoeslagWeekly=32] - Týdenní příspěvek na pojištění od státu
 * @param {number} [input.shiftAllowance=1.0] - Příplatek za směny (např. 1.15)
 * @param {boolean} [input.applyET=true] - Povolit ET Regeling
 * @returns {Object} Detailní rozpis výpočtu (brutto, daně, srážky, netto, effective_rate)
 */
export function calculateWeeklySalary(input) {
  const {
    hourlyRate,
    hoursWorked,
    age,
    housingCostWeekly = 135,
    insuranceCostWeekly = 38.50,
    zorgtoeslagWeekly = 32,
    shiftAllowance = 1.0,
    applyET = true
  } = input;

  // 1. Aplikace Jeugdloon (snížení mzdy o 10 % za každý rok pod 21, min. 60 %)
  let effectiveHourlyRate = hourlyRate;
  let jeugdloonMultiplier = 1.0;

  if (age < 21) {
    const yearsUnder21 = 21 - age;
    jeugdloonMultiplier = Math.max(0.60, 1.0 - (yearsUnder21 * 0.10));
    effectiveHourlyRate = hourlyRate * jeugdloonMultiplier;
  }
  
  // Aplikace příplatku za směny na finální sazbu (shift_allowance např 1.15)
  effectiveHourlyRate = effectiveHourlyRate * shiftAllowance;

  // 2. Base + Overtime + Holiday Pay
  // Prvních 40 hodin = effectiveHourlyRate
  // Nad 40 hodin = overtime (125% sazby)
  const regularHours = Math.min(40, hoursWorked);
  const overtimeHours = Math.max(0, hoursWorked - 40);
  
  const basePay = regularHours * effectiveHourlyRate;
  const overtimePay = overtimeHours * (effectiveHourlyRate * 1.25);
  
  // Holiday Pay (8%) ze všech výdělků
  const totalBasePay = basePay + overtimePay;
  const holidayPay = totalBasePay * 0.08;

  // Hrubá mzda celkem
  const grossWeekly = totalBasePay + holidayPay;

  // 3. Taxable Base & ET Regeling
  let taxableBase = grossWeekly;
  let housingDeductionFromNetto = housingCostWeekly;
  let housingDeductedViaET = 0;

  // ET Regeling: odečteme náklady na ubytování Z HRUBÉ mzdy PŘED zdaněním.
  if (applyET && taxableBase > housingCostWeekly) {
    taxableBase -= housingCostWeekly;
    housingDeductedViaET = housingCostWeekly;
    housingDeductionFromNetto = 0; // Ubytování zaplaceno z nezdaněné čisté části
  }

  // 4. Daň (Loonheffing) - jednoduchý odhad 19 % pro roční příjem do 38 000 €
  const taxRate = 0.19;
  const taxAmount = taxableBase * taxRate;

  // 5. Mzda po zdanění (Netto before deductions)
  const afterTax = taxableBase - taxAmount;

  // 6. Srážky a Bonusy
  const totalDeductions = housingDeductionFromNetto + insuranceCostWeekly;
  const totalAllowances = zorgtoeslagWeekly;

  const netto_total = afterTax - totalDeductions + totalAllowances;
  const effective_hourly_rate = hoursWorked > 0 ? netto_total / hoursWorked : 0;

  return {
    inputs: {
      originalHourlyRate: hourlyRate,
      effectiveHourlyRate: Number(effectiveHourlyRate.toFixed(2)),
      hoursWorked,
      age,
      applyET
    },
    breakdown: {
      basePay: Number(basePay.toFixed(2)),
      overtimePay: Number(overtimePay.toFixed(2)),
      holidayPay: Number(holidayPay.toFixed(2)),
      grossWeekly: Number(grossWeekly.toFixed(2)),
      taxableBase: Number(taxableBase.toFixed(2)),
      taxAmount: Number(taxAmount.toFixed(2)),
      afterTaxWeekly: Number(afterTax.toFixed(2)),
      deductions: {
        housingET: housingDeductedViaET,
        housingNetto: housingDeductionFromNetto,
        insurance: insuranceCostWeekly,
        total: Number((housingDeductedViaET + totalDeductions).toFixed(2))
      },
      allowances: {
        zorgtoeslag: zorgtoeslagWeekly,
        total: Number(totalAllowances.toFixed(2))
      }
    },
    netto_total: Number(netto_total.toFixed(2)),
    netWeekly: Number(netto_total.toFixed(2)), // For backward compatibility
    effective_hourly_rate: Number(effective_hourly_rate.toFixed(2)),
    monthlyEstimated: Number((netto_total * 4.33).toFixed(2))
  };
}
