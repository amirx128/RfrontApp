import React, { useState, useEffect } from 'react';
import { Grid, Button, Container, Paper, TextField, Snackbar, Alert } from '@mui/material';
import { getCaptcha, registerUser, getDropdownItems } from '../../api';
import { Link } from '@mui/material';

import {
  GenderDropdown,  ProvinceDropdown,
  HealtStatusDropdown, LiveTypeDropdown, MarriageStatusDropdown,
  CarValuesDropdown,
  HomeValueDropDown,
  IncomeAmountDropDown,
  RelationTypeDropDown,
  GhadDropDown,
  VaznDropDown,
  TipDropDown,
  ZibaeeDropDown,
  CheildCountDropDown,
  RangePoostDropDown,
  FirstCheildAgeDown
} from './Dropdowns';
import BirthdaySelector from './BirthdaySelector'; // این را اضافه کردم

const RegisterForm = () => {
  const [captcha, setCaptcha] = useState({ id: null, image: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);
  const [dropdownData, setDropdownData] = useState({
    genders: [],
    healtStatus: [],
    liveTypes: [],
    marriageStatus: [],
    provinces: [],
    incomeAmount: [],
    homeValue: [],
    carValue: [],
    relationType: [],
    ghad: [],
    vazn: [],
    tipNumber: [],
    zibaeeNumber: [],
    cheildCount: [],
    firstCheildAge: [],
    rangePoost: [],
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    mobile: '',
    captchaValue: '',
    captchaId: null,  province: '',
    healtStatus: '',
    liveType: '',
    marriageStatus: '',
    rDescription: '',
    myDescription: '',
    birthDate: '',
    emailAddress: '',
    incomeAmount: '',
    homeValue: '',
    carValue: '',
    relationType: '',
    ghad: '',
    vazn: '',
    tipNumber: '',
    zibaeeNumber: '',
    cheildCount: '',
    firstCheildAge: '',
    rangePoost: '',

  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const fetchCaptcha = async () => {
    setIsCaptchaLoading(true);
    try {
      const captchaResponse = await getCaptcha();
      if (captchaResponse.data && captchaResponse.data.guid && captchaResponse.data.image) {
        setCaptcha({ id: captchaResponse.data.guid, image: captchaResponse.data.image });
        setFormData(prevData => ({
          ...prevData,
          captchaId: captchaResponse.data.guid
        }));
      }
    } catch (error) {
      console.error('❌ Error fetching captcha:', error);
    } finally {
      setIsCaptchaLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dropdownResponse = await getDropdownItems();
        if (dropdownResponse.data.isSuccess) {
          setDropdownData({
            genders: dropdownResponse.data.model.genders || [],
            healtStatus: dropdownResponse.data.model.healtStatus || [],
            liveTypes: dropdownResponse.data.model.liveTypes || [],
            marriageStatus: dropdownResponse.data.model.marriageStatus || [],
            provinces: dropdownResponse.data.model.provinces || [],
            incomeAmount: dropdownResponse.data.model.incomeAmount || [],
            carValue: dropdownResponse.data.model.carValue || [],
            homeValue: dropdownResponse.data.model.homeValue || [],
            relationType: dropdownResponse.data.model.relationType || [],
            ghad: dropdownResponse.data.model.ghad || [],
            vazn: dropdownResponse.data.model.vazn || [],
            zibaeeNumber: dropdownResponse.data.model.zibaeeNumber || [],
            tipNumber: dropdownResponse.data.model.tipNumber || [],
            cheildCount: dropdownResponse.data.model.cheildCount || [],
            firstCheildAge: dropdownResponse.data.model.firstCheildAge || [],
            rangePoost: dropdownResponse.data.model.rangePoost || [],
          });
        }
        await fetchCaptcha();
      } catch (error) {
        console.error('❌ Error fetching dropdown data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.captchaId) {
      console.error("❌ Captcha ID is missing! Registration aborted.");
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('✅ Form submitted successfully:', response.data);

      if (response.data.isSuccess) {
        setSnackbar({ open: true, message: 'ثبت‌نام با موفقیت انجام شد!', severity: 'success' });
        setTimeout(() => {
          window.location.href = 'https://www.google.com';
        }, 2000);
      } else {
        setSnackbar({ open: true, message: response.data.message, severity: 'error' });
        await fetchCaptcha();
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
    }
  };

  const refreshCaptcha = async () => {
    await fetchCaptcha();
  };

  if (isLoading) {
    return <div>⏳ لطفاً صبر کنید، در حال بارگیری اطلاعات...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>

          <div class="banner2">
            <p class="banner-text2">بمنظور استفاده از امکانات سایت</p>
            <p class="banner-text2"> ابتدا ثبت نام کنید</p>
          </div>

          <Grid container spacing={2}>
            <TextField label="نام" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
            <TextField label="نام خانوادگی" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
            <TextField label="نام کاربری" name="userName" value={formData.userName} onChange={handleChange} fullWidth />
            <TextField label="رمز عبور" name="password" value={formData.password} onChange={handleChange} type="password" fullWidth />
            <TextField label="شماره موبایل" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth />
            <TextField label="آدرس ایمیل" name="emailAddress" value={formData.emailAddress} onChange={handleChange} fullWidth />
            <TextField label="توضیحات من" name="myDescription" value={formData.myDescription} onChange={handleChange} fullWidth />
            <TextField label="توضیحات دریافت شده" name="rDescription" value={formData.rDescription} onChange={handleChange} fullWidth />

            <Grid item xs={12}>
              <BirthdaySelector
                value={formData.birthDate}
                onChange={(date) => setFormData({ ...formData, birthDate: date })}
              />
            </Grid>
            <GenderDropdown gender={formData.gender} handleChange={handleChange} genders={dropdownData.genders} />
            <ProvinceDropdown province={formData.province} handleChange={handleChange} provinces={dropdownData.provinces} />
            <HealtStatusDropdown healtStatus={formData.healtStatus} handleChange={handleChange} healtStatusOptions={dropdownData.healtStatus} />
            <LiveTypeDropdown liveType={formData.liveType} handleChange={handleChange} liveTypes={dropdownData.liveTypes} />
            <MarriageStatusDropdown marriageStatus={formData.marriageStatus} handleChange={handleChange} marriageStatusOptions={dropdownData.marriageStatus} />
            <HomeValueDropDown homeValue={formData.homeValue} handleChange={handleChange} homeValues={dropdownData.homeValue} />
            <CarValuesDropdown carValue={formData.carValue} handleChange={handleChange} carValueOptions={dropdownData.carValue} />
            <IncomeAmountDropDown incomeAmount={formData.incomeAmount} handleChange={handleChange} incomeAmounts={dropdownData.incomeAmount} />
            <RelationTypeDropDown relationType={formData.relationType} handleChange={handleChange} relationTypes={dropdownData.relationType} />
          
            <RangePoostDropDown values={formData.rangePoost} handleChange={handleChange} options={dropdownData.rangePoost} />
            <TipDropDown values={formData.tipNumber} handleChange={handleChange} options={dropdownData.tipNumber} />
            <ZibaeeDropDown values={formData.zibaeeNumber} handleChange={handleChange} options={dropdownData.zibaeeNumber} />
            <GhadDropDown values={formData.ghad} handleChange={handleChange} options={dropdownData.ghad} />
            <VaznDropDown values={formData.vazn} handleChange={handleChange} options={dropdownData.vazn} />
            <CheildCountDropDown values={formData.cheildCount} handleChange={handleChange} options={dropdownData.cheildCount} />
            <FirstCheildAgeDown values={formData.firstCheildAge} handleChange={handleChange} options={dropdownData.firstCheildAge} />


            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs={6}>
                {isCaptchaLoading ? (
                  <div>⏳ در حال بارگیری کپچا...</div>
                ) : (
                  captcha.image ? (
                    <img src={captcha.image} alt="Captcha" style={{ width: '100%' }} />
                  ) : (
                    <div>⚠️ تصویر کپچا بارگذاری نشد!</div>
                  )
                )}
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" onClick={refreshCaptcha}>🔄 دریافت مجدد</Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="کد امنیتی"
                  name="captchaValue"
                  value={formData.captchaValue}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                ثبت‌نام
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link href="/login" variant="body2">بازگشت به صفحه ورود به سامانه</Link>
              <br />
              <Link href="/forgot-password" variant="body2">بازیابی رمز عبور</Link>
            </Grid>


          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterForm;
