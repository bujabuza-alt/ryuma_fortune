import { ref, onMounted } from 'vue';

// 경기 화성시 동탄 (매장 위치) — 위치 권한이 없거나 실패할 때의 대체 좌표
const FALLBACK_LAT = 37.2016;
const FALLBACK_LON = 127.0731;

function mapWeatherCode(code) {
  if (code === 0) return { emoji: '☀️', label: '맑음' };
  if (code === 1 || code === 2) return { emoji: '⛅', label: '구름조금' };
  if (code === 3) return { emoji: '☁️', label: '흐림' };
  if (code === 45 || code === 48) return { emoji: '🌫️', label: '안개' };
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(code)) return { emoji: '🌧️', label: '비' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { emoji: '❄️', label: '눈' };
  if ([80, 81, 82].includes(code)) return { emoji: '🌦️', label: '소나기' };
  if ([95, 96, 99].includes(code)) return { emoji: '⛈️', label: '뇌우' };
  return { emoji: '🌡️', label: '' };
}

export function useWeather() {
  const weatherEmoji = ref('');
  const weatherTemp = ref(null);
  const weatherLabel = ref('');
  const weatherLoading = ref(true);
  const weatherError = ref(false);

  async function fetchWeather(lat, lon) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('weather fetch failed');
      const data = await res.json();
      const temp = data?.current?.temperature_2m;
      const code = data?.current?.weather_code;
      if (temp === undefined || code === undefined) throw new Error('malformed weather response');

      const { emoji, label } = mapWeatherCode(code);
      weatherTemp.value = Math.round(temp);
      weatherEmoji.value = emoji;
      weatherLabel.value = label;
    } catch (e) {
      weatherError.value = true;
    } finally {
      weatherLoading.value = false;
    }
  }

  function loadWeather() {
    if (!navigator.geolocation) {
      fetchWeather(FALLBACK_LAT, FALLBACK_LON);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather(FALLBACK_LAT, FALLBACK_LON),
      { timeout: 5000, maximumAge: 600000 }
    );
  }

  onMounted(loadWeather);

  return { weatherEmoji, weatherTemp, weatherLabel, weatherLoading, weatherError };
}
