// PatientForm.tsx
// 注意：你目前提供的檔案內容已經重複且混入其他 JSX，
// 此檔保留你目前 Patient Modal 區段供重新整理使用。
// 建議下一步依 React 元件重新整理 imports / props。

{showNewPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingPatientId ? "編輯病例" : "新增病例"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingPatientId
                    ? "修改病童基本資料與出生資訊。"
                    : "建立病童基本資料與出生資訊。"}
                </p>
              </div>

              <button
                type="button"
                onClick={closePatientModal}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSavePatient}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>
                    病歷號碼／病例 ID
                  </FieldLabel>

                  <input
                    value={patientForm.chartNumber}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        chartNumber:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：C20260002"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    病童姓名
                  </FieldLabel>

                  <input
                    value={patientForm.name}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="輸入病童姓名"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    生理性別
                  </FieldLabel>

                  <select
                    value={
                      patientForm.biologicalSex
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        biologicalSex:
                          event.target
                            .value as BiologicalSex,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="male">
                      男
                    </option>
                    <option value="female">
                      女
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>
                    出生日期
                  </FieldLabel>

                  <input
                    type="date"
                    max={today}
                    value={patientForm.birthday}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthday:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    主要照顧者姓名
                  </FieldLabel>

                  <input
                    value={
                      patientForm.guardianName
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianName:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：王先生"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    照顧者聯絡電話
                  </FieldLabel>

                  <input
                    type="tel"
                    value={
                      patientForm.guardianPhone
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianPhone:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：0912-345-678"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    初診日期
                  </FieldLabel>

                  <input
                    type="date"
                    value={
                      patientForm.firstVisitDate
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
onChange={(event) =>
                setSearchKeyword(event.target.value)
              }
              placeholder="輸入病歷號碼、姓名或電話"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-2">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => {
                const active =
                  patient.id === selectedPatientId

                const latest =
                  [...patient.measurements].sort(
                    (a, b) =>
                      new Date(
                        b.measuredAt,
                      ).getTime() -
                      new Date(
                        a.measuredAt,
                      ).getTime(),
                  )[0] ?? null

                return (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() =>
                      setSelectedPatientId(patient.id)
                    }
                    className={`mb-2 w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">
                          {patient.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {patient.chartNumber}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          patient.biologicalSex ===
                          "male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {patient.biologicalSex ===
                        "male"
                          ? "男"
                          : "女"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {patient.measurements.length} 筆紀錄
                      </span>

                      <span>
                        {latest
                          ? formatDate(
                              latest.measuredAt,
                            )
                          : "尚未量測"}
                      </span>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  找不到符合的病例
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openCreatePatientModal()
                  }
                  className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  建立新病例
                </button>
              </div>
            )}
          </div>
        </aside>

        <section className="min-w-0">
          {selectedPatient ? (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {selectedPatient.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            selectedPatient.biologicalSex ===
                            "male"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {selectedPatient.biologicalSex ===
                          "male"
                            ? "男童"
                            : "女童"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        病歷號碼：
                        <span className="font-semibold text-slate-700">
                          {
                            selectedPatient.chartNumber
                          }
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openEditPatientModal(selectedPatient)
                      }
                      className="w-fit rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      編輯基本資料
                    </button>
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生日期
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(
                        selectedPatient.birthday,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      最新實際年齡
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {latestAge
                        ? latestAge.label
                        : "尚未量測"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      主要照顧者
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.guardianName ||
                        "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      聯絡電話
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.guardianPhone ||
                        "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      初診日期
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(
                        selectedPatient.firstVisitDate,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      是否早產
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.premature
                        ? `是${
                            selectedPatient.gestationalWeeks
                              ? `，${selectedPatient.gestationalWeeks} 週`
                              : ""
                          }`
                        : "否"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生身高
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.birthHeight
                        ? `${selectedPatient.birthHeight} cm`
                        : "未填寫"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      出生體重
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPatient.birthWeight
                        ? `${selectedPatient.birthWeight} kg`
                        : "未填寫"}
                    </p>
                  </div>
                </div>

                {selectedPatient.note && (
                  <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600 sm:px-6">
                    <span className="font-bold text-slate-800">
                      病例備註：
                    </span>
                    {selectedPatient.note}
                  </div>
                )}
              </section>

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                  label="最新身高"
                  value={
                    latestMeasurement
                      ? latestMeasurement.height.toFixed(
                          1,
                        )
                      : "—"
                  }
                  unit="cm"
                  description={
                    heightChange !== null
                      ? `較前次 ${
                          heightChange >= 0 ? "增加" : "減少"
                        } ${Math.abs(
                          heightChange,
                        ).toFixed(1)} cm`
                      : "尚無前次紀錄可比較"
                  }
                />

                <SummaryCard
                  label="最新體重"
                  value={
                    latestMeasurement
                      ? latestMeasurement.weight.toFixed(
                          1,
                        )
                      : "—"
                  }
                  unit="kg"
                  description={
                    weightChange !== null
                      ? `較前次 ${
                          weightChange >= 0 ? "增加" : "減少"
                        } ${Math.abs(
                          weightChange,
                        ).toFixed(1)} kg`
                      : "尚無前次紀錄可比較"
                  }
                />

                <SummaryCard
                  label="最新 BMI"
                  value={
                    latestMeasurement
                      ? latestBmi.toFixed(2)
                      : "—"
                  }
                  description="之後可依國健署標準顯示 BMI 百分位區間。"
                />

                <SummaryCard
                  label="量測次數"
                  value={String(
                    selectedPatient.measurements
                      .length,
                  )}
                  unit="次"
                  description={
                    latestMeasurement
                      ? `最近量測：${formatDate(
                          latestMeasurement.measuredAt,
                        )}`
                      : "目前尚無量測紀錄"
                  }
                />
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      生長曲線
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      所有歷史量測紀錄會同時標示於曲線上。
                    </p>
                  </div>

                  <div className="flex rounded-xl bg-slate-100 p-1">
                    {[
                      {
                        value: "height",
                        label: "身高",
                      },
                      {
                        value: "weight",
                        label: "體重",
                      },
                      {
                        value: "bmi",
                        label: "BMI",
                      },
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() =>
                          setActiveChart(
                            tab.value as
                              | "height"
                              | "weight"
                              | "bmi",
                          )
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                          activeChart === tab.value
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activeChart === "height" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="height"
                    title="身高－年齡生長曲線"
                    unit="cm"
                  />
                )}

                {activeChart === "weight" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="weight"
                    title="體重－年齡生長曲線"
                    unit="kg"
                  />
                )}

                {activeChart === "bmi" && (
                  <MeasurementChart
                    patient={selectedPatient}
                    metric="bmi"
                    title="BMI－年齡生長曲線"
                    unit="BMI"
                  />
                )}
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      歷次量測紀錄
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      最新紀錄顯示於最上方。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowMeasurementModal(true)
                    }
                    className="w-fit rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    ＋ 新增紀錄
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-6 py-4">
                          測量日期
                        </th>
                        <th className="px-6 py-4">
                          實際年齡
                        </th>
                        <th className="px-6 py-4">
                          身高
                        </th>
                        <th className="px-6 py-4">
                          體重
                        </th>
                        <th className="px-6 py-4">
                          BMI
                        </th>
                        <th className="px-6 py-4">
                          頭圍
                        </th>
                        <th className="px-6 py-4">
                          骨齡
                        </th>
                        <th className="px-6 py-4">
                          備註
                        </th>
                        <th className="px-6 py-4 text-right">
                          操作
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {sortedMeasurements.length >
                      0 ? (
                        sortedMeasurements.map(
                          (
                            measurement,
                            index,
                          ) => {
                            const age =
                              calculateAgeDetail(
                                selectedPatient.birthday,
                                measurement.measuredAt,
                              )

                            const bmi =
                              calculateBmi(
                                measurement.height,
                                measurement.weight,
                              )

                            return (
                              <tr
                                key={measurement.id}
                                className="hover:bg-slate-50"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                                  {formatDate(
                                    mea
surement.measuredAt,
                                  )}

                                  {index === 0 && (
                                    <span className="ml-2 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                                      最新
                                    </span>
                                  )}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {age.label}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                                  {measurement.height.toFixed(
                                    1,
                                  )}{" "}
                                  cm
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                                  {measurement.weight.toFixed(
                                    1,
                                  )}{" "}
                                  kg
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {bmi.toFixed(2)}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {measurement.headCircumference
                                    ? `${measurement.headCircumference.toFixed(
                                        1,
                                      )} cm`
                                    : "—"}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                  {measurement.boneAge
                                    ? `${measurement.boneAge.toFixed(
                                        1,
                                      )} 歲`
                                    : "—"}
                                </td>

                                <td className="max-w-[240px] px-6 py-4 text-sm text-slate-600">
                                  {measurement.note ||
                                    "—"}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteMeasurement(
                                        measurement.id,
                                      )
                                    }
                                    className="text-sm font-bold text-red-600 hover:text-red-700"
                                  >
                                    刪除
                                  </button>
                                </td>
                              </tr>
                            )
                          },
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="px-6 py-16 text-center text-sm text-slate-500"
                          >
                            尚無量測紀錄，請新增第一筆身高與體重資料。
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex min-h-[600px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                ♡
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                請選擇或新增病例
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                從左側搜尋病例，或建立新的病童資料。
              </p>

              <button
                type="button"
                onClick={() =>
                  openCreatePatientModal()
                }
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                ＋ 新增病例
              </button>
            </div>
          )}
        </section>
      </div>

      {showNewPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingPatientId ? "編輯病例" : "新增病例"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingPatientId
                    ? "修改病童基本資料與出生資訊。"
                    : "建立病童基本資料與出生資訊。"}
                </p>
              </div>

              <button
                type="button"
                onClick={closePatientModal}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSavePatient}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>
                    病歷號碼／病例 ID
                  </FieldLabel>

                  <input
                    value={patientForm.chartNumber}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        chartNumber:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：C20260002"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    病童姓名
                  </FieldLabel>

                  <input
                    value={patientForm.name}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="輸入病童姓名"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel required>
                    生理性別
                  </FieldLabel>

                  <select
                    value={
                      patientForm.biologicalSex
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        biologicalSex:
                          event.target
                            .value as BiologicalSex,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="male">
                      男
                    </option>
                    <option value="female">
                      女
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>
                    出生日期
                  </FieldLabel>

                  <input
                    type="date"
                    max={today}
                    value={patientForm.birthday}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthday:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    主要照顧者姓名
                  </FieldLabel>

                  <input
                    value={
                      patientForm.guardianName
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianName:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：王先生"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    照顧者聯絡電話
                  </FieldLabel>

                  <input
                    type="tel"
                    value={
                      patientForm.guardianPhone
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        guardianPhone:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：0912-345-678"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    初診日期
                  </FieldLabel>

                  <input
                    type="date"
                    value={
                      patientForm.firstVisitDate
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        firstVisitDate:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    是否早產
                  </FieldLabel>

                  <div className="flex h-[46px] items-center gap-4 rounded-xl border border-slate-300 px-4">
                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={
                          !patientForm.premature
                        }
                        onChange={() =>
                          setPatientForm(
                            (current) => ({
                              ...current,
                              premature: false,
                            }),
                          )
                        }
                      />
                      否
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={
                          patientForm.premature
                        }
                        onChange={() =>
                          setPatientForm(
                            (current) => ({
                              ...current,
                              premature: true,
                            }),
                          )
                        }
                      />
                      是
                    </label>
                  </div>
                </div>

                {patientForm.premature && (
                  <div>
                    <FieldLabel>
                      出生週數
                    </FieldLabel>

                    <input
                      type="number"
                      min="20"
                      max="42"
                      step="0.1"
                      value={
                        patientForm.gestationalWeeks
                      }
                      onChange={(event) =>
                        setPatientForm(
                          (current) => ({
                            ...current,
                            gestationalWeeks:
                              event.target.value,
                          }),
                        )
                      }
                      placeholder="例如：35"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                )}

                <div>
                  <FieldLabel>
                    出生身高（cm）
                  </FieldLabel>

                  <input
                    type="number"
                    min="20"
                    max="80"
                    step="0.1"
                    value={
                      patientForm.birthHeight
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthHeight:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：50"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <FieldLabel>
                    出生體重（kg）
                  </FieldLabel>

                  <input
                    type="number"
                    min="0.3"
                    max="10"
                    step="0.01"
                    value={
                      patientForm.birthWeight
                    }
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        birthWeight:
                          event.target.value,
                      }))
                    }
                    placeholder="例如：3.2"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>病例備註</FieldLabel>

                  <textarea
                    rows={4}
                    value={patientForm.note}
                    onChange={(event) =>
                      setPatientForm((current) => ({
                        ...current,
                        note: event.target.value,
                      }))
                    }
                    placeholder="可記錄轉診原因、主要追蹤項目或其他說明。"
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={closePatientModal}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  取消
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {saving
                    ? editingPatientId
                      ? "儲存中…"
                      : "建立中…"
                    : editingPatientId
                      ? "儲存修改"
                      : "建立病例"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}