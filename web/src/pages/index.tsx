import { Form, Formik, FormikHelpers } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { BiCheckCircle, BiMailSend, BiX } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';
import { z } from 'zod';
import { classNames } from '../class-names';
import { toFormikValidationSchema } from '../formik-adapter';
import { InputField } from '../InputField';

const API_URL =
  'https://2enc2o02gb.execute-api.eu-central-1.amazonaws.com/default/domain-parking-contact';

const schema = z.object({
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  offer: z.number().min(100).max(100000),
  currency: z.enum(['USD', 'EUR'])
});

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit<T = z.infer<typeof schema>>(values: T, helpers: FormikHelpers<T>) {
    setLoading(true);

    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        domain: window.location.host
      }),
    });

    setLoading(false);
    setSuccess(true);

    helpers.resetForm();
  }

  return (
    <>
      <Head>
        <title>Domain offer</title>
      </Head>
      <div className="tw-min-h-screen tw-relative tw-overflow-hidden tw-bg-white tw-py-16 tw-px-4 sm:tw-px-6 lg:tw-px-8 lg:tw-py-24">
        <div className="tw-mx-auto tw-max-w-xl">
          <svg
            className="tw-absolute tw-left-full tw-hidden tw--translate-x-1/2 tw-transform lg:tw-block"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="tw-text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="tw-absolute tw-right-full tw-bottom-0 tw-hidden tw-translate-x-1/2 tw-transform lg:tw-block"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="tw-text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <div className="tw-text-center">
            <h2 className="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl">
              Request domain
            </h2>
            <p className="tw-mt-4 tw-text-lg tw-leading-6 tw-text-gray-500">
              Fill the form below to request the domain name and we will get back
              to you as soon as possible.
            </p>
          </div>
          {success && (
            <div className="tw-rounded-md tw-bg-green-50 tw-p-4 tw-mt-12">
              <div className="tw-flex">
                <div className="tw-flex-shrink-0">
                  <BiCheckCircle
                    className="tw-h-5 tw-w-5 tw-text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="tw-ml-3">
                  <p className="tw-text-sm tw-font-medium tw-text-green-800">
                    Successfully sent offer
                  </p>
                </div>
                <div className="tw-ml-auto tw-pl-3">
                  <div className="tw--mx-1.5 tw--my-1.5">
                    <button
                      type="button"
                      className="tw-inline-flex tw-rounded-md tw-bg-green-50 tw-p-1.5 tw-text-green-500 hover:tw-bg-green-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-600 focus:tw-ring-offset-2 focus:tw-ring-offset-green-50"
                      onClick={() => setSuccess(false)}
                    >
                      <span className="tw-sr-only">Dismiss</span>
                      <BiX className="tw-h-5 tw-w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="tw-mt-12">
            <Formik
              initialValues={{
                email: '',
                subject: '',
                message: '',
                offer: 0,
                currency: 'EUR'
              }}
              validationSchema={toFormikValidationSchema(schema)}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                setValues,
              }) => {
                return (
                  <Form
                    action="#"
                    method="POST"
                    className="tw-grid tw-grid-cols-1 tw-gap-y-6 sm:tw-grid-cols-2 sm:tw-gap-x-8"
                  >
                    <div className="sm:tw-col-span-2"></div>
                    <div className="sm:tw-col-span-2">
                      <InputField
                        as="input"
                        type="text"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />
                    </div>
                    <div className="sm:tw-col-span-2">
                      <InputField
                        as="input"
                        type="text"
                        name="subject"
                        label="Subject"
                        required
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subject && errors.subject}
                      />
                    </div>
                    <div className="sm:tw-col-span-2">
                      <InputField
                        as="textarea"
                        name="message"
                        label="Message"
                        required
                        rows={3}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && errors.message}
                      />
                    </div>
                    <div className="sm:tw-col-span-2">
                      <InputField
                        as="input"
                        type="number"
                        name="offer"
                        label="Offer"
                        required
                        value={values.offer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.offer && errors.offer}
                        startAdornment={
                          values.currency === 'EUR' ? '€' : '$'
                        }
                        endAdornment={
                          <>
                            <label htmlFor="currency" className="tw-sr-only">
                              Currency
                            </label>
                            <select
                              id="currency"
                              name="currency"
                              className="tw-h-full tw-rounded-md tw-border-transparent tw-bg-transparent tw-py-0 tw-pl-2 tw-pr-7 tw-text-gray-500 focus:tw-border-indigo-500 focus:tw-ring-indigo-500 sm:tw-text-sm"
                              value={values.currency}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option>EUR</option>
                              <option>USD</option>
                            </select>
                          </>
                        }
                      />
                    </div>
                    {/* <div className="sm:tw-col-span-2">
                    <div className="tw-flex tw-items-start">
                      <div className="tw-flex-shrink-0">
                        <Switch
                          checked={agreed}
                          onChange={setAgreed}
                          className={classNames(
                            agreed ? 'tw-bg-indigo-600' : 'tw-bg-gray-200',
                            'tw-relative tw-inline-flex tw-h-6 tw-w-11 tw-flex-shrink-0 tw-cursor-pointer tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors tw-duration-200 tw-ease-in-out focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2'
                          )}
                        >
                          <span className="tw-sr-only">Agree to policies</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              agreed ? 'tw-translate-x-5' : 'tw-ranslate-x-0',
                              'tw-ring-tw-0 tw-inline-block tw-h-5 tw-w-5 tw-transform tw-rounded-full tw-bg-white tw-shadow tw-transition tw-duration-200 tw-ease-in-out'
                            )}
                          />
                        </Switch>
                      </div>
                      <div className="tw-ml-3">
                        <p className="tw-text-base tw-text-gray-500">
                          By selecting this, you agree to the{' '}
                          <a
                            href="#"
                            className="tw-font-medium tw-text-gray-700 tw-underline"
                          >
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a
                            href="#"
                            className="tw-font-medium tw-text-gray-700 tw-underline"
                          >
                            Cookie Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div> */}
                    <div className="sm:tw-col-span-2">
                      <button
                        type="submit"
                        className="tw-relative tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-indigo-600 tw-px-6 tw-py-2 tw-text-base tw-text-white tw-shadow-sm hover:tw-bg-indigo-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2"
                      >
                        <div
                          className={classNames(
                            'tw-inline-flex tw-items-center tw-justify-center',
                            loading && 'tw-invisible tw-opacity-0 '
                          )}
                        >
                          Send non-binding request
                          <BiMailSend className="tw-ml-2 tw-h-5 tw-w-5" />
                        </div>
                        {loading && (
                          <div className="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2 tw-transform">
                            <ImSpinner2 className=" tw-h-5 tw-w-5 tw-animate-spin tw-text-white" />
                          </div>
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
