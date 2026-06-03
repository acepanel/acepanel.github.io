---
sidebar: false
aside: false
prev: false
next: false
---

<style>
.cert-hero {
  text-align: center;
  padding: 40px 0 60px;
}

.cert-hero h1 {
  font-size: 36px;
  margin-bottom: 16px;
  border: none;
}

.cert-hero p {
  font-size: 18px;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

.cert-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .cert-cards {
    grid-template-columns: 1fr;
  }
}

.cert-card {
  position: relative;
  padding: 32px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.cert-card.featured {
  border: 2px solid var(--vp-c-brand);
}

.cert-badge {
  position: absolute;
  top: -12px;
  right: 24px;
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.cert-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.cert-card h3 {
  font-size: 22px;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
}

.cert-card-desc {
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 24px;
}

.cert-price {
  margin-bottom: 24px;
}

.cert-price-value {
  font-size: 42px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.cert-price-unit {
  font-size: 16px;
  opacity: 0.6;
}

.cert-features {
  margin-bottom: 28px;
}

.cert-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.cert-feature:last-child {
  border-bottom: none;
}

.cert-feature-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

.cert-card a.cert-btn {
  display: block !important;
  width: 100% !important;
  padding: 14px 24px !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  text-align: center !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider) !important;
}

.cert-card a.cert-btn:hover {
  border-color: var(--vp-c-brand) !important;
  color: var(--vp-c-brand) !important;
  text-decoration: none !important;
}

.cert-card.featured a.cert-btn {
  background: var(--vp-c-brand) !important;
  color: white !important;
  border: none !important;
}

.cert-card.featured a.cert-btn:hover {
  opacity: 0.9 !important;
  transform: translateY(-1px) !important;
  color: white !important;
}

.cert-why {
  margin-top: 60px;
}

.cert-why h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
}

.cert-why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .cert-why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cert-why-item {
  text-align: center;
  padding: 24px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.cert-why-item:hover {
  transform: translateY(-2px);
}

.cert-why-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.cert-why-icon.shield { background: #3b82f6; }
.cert-why-icon.bolt { background: #f59e0b; }
.cert-why-icon.globe { background: #10b981; }
.cert-why-icon.support { background: #8b5cf6; }

.cert-why-item h4 {
  font-size: 16px;
  margin: 0 0 8px 0;
}

.cert-why-item p {
  font-size: 14px;
  opacity: 0.7;
  margin: 0;
}

.cert-contact {
  margin-top: 60px;
  text-align: center;
  padding: 40px;
  border-radius: 16px;
  background: var(--vp-c-brand);
  color: white;
}

.cert-contact h3 {
  font-size: 24px;
  margin: 0 0 12px 0;
  color: white;
  border: none;
}

.cert-contact p {
  opacity: 0.9;
  margin: 0 0 24px 0;
}

.cert-contact-btn {
  display: inline-block;
  padding: 12px 32px;
  background: white;
  color: var(--vp-c-brand);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cert-contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}</style>

<div class="cert-hero">
  <h1>SSL 憑證服務</h1>
  <p>免費憑證有效期僅 3 個月且需要頻繁續約， 付費憑證有效期一年，省時又省力</p>
</div>

<div class="cert-cards">
  <div class="cert-card">
    <div class="cert-card-icon">🔒</div>
    <h3>DV 單一網域憑證</h3>
    <div class="cert-card-desc">適合單一網站使用</div>
    <div class="cert-price"><span class="cert-price-value">¥1X</span>
      <span class="cert-price-unit"> / 年</span>
    </div>
    <div class="cert-features">
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>網域驗證 (DV) 憑證</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>保護單一網域</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>一年有效期</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>國際認可品牌</span>
      </div>
    </div><a href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH" target="_blank" class="cert-btn cert-btn-secondary">聯絡購買</a>
  </div>

  <div class="cert-card featured"><span class="cert-badge">推薦</span>
    <div class="cert-card-icon">🛡️</div>
    <h3>DV 萬用字元憑證</h3>
    <div class="cert-card-desc">一張憑證即可保護所有子網域</div>
    <div class="cert-price"><span class="cert-price-value">¥1XX</span>
      <span class="cert-price-unit"> / 年</span>
    </div>
    <div class="cert-features">
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>網域驗證 (DV) 憑證</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>保護所有子網域 (*.domain.com)</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>一年有效期</span>
      </div>
      <div class="cert-feature"><span class="cert-feature-check">✓</span>
        <span>國際認可品牌</span>
      </div>
    </div><a href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH" target="_blank" class="cert-btn cert-btn-primary">聯絡購買</a>
  </div>
</div>

<div class="cert-why">
  <h2>為什麼選擇付費憑證</h2>
  <div class="cert-why-grid">
    <div class="cert-why-item">
      <div class="cert-why-icon shield">🔐</div>
      <h4>更長的有效期</h4>
      <p>一年有效期，無需頻繁續約</p>
    </div>
    <div class="cert-why-item">
      <div class="cert-why-icon bolt">⚡</div>
      <h4>快速簽發</h4>
      <p>付款後即可快速完成簽發</p>
    </div>
    <div class="cert-why-item">
      <div class="cert-why-icon globe">🌐</div>
      <h4>國際品牌</h4>
      <p>受全球瀏覽器信任</p>
    </div>
    <div class="cert-why-item">
      <div class="cert-why-icon support">💬</div>
      <h4>專業支援</h4>
      <p>遇到問題隨時諮詢</p>
    </div>
  </div>
</div>

<div class="cert-contact">
  <h3>需要協助嗎？</h3>
  <p>如有任何問題，歡迎加入我們的 QQ 群組諮詢</p><a href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH" target="_blank" class="cert-contact-btn">加入 QQ 群組 12370907</a></div>
