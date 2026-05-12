/**
 * Script de otimização de imagens — Converte PNG/JPG/JFIF para WebP
 * Uso: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = 'src/assets';
const QUALITY = 80; // 80 é excelente para arte — quase imperceptível vs original
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.jfif'];

let converted = 0;
let totalSavedBytes = 0;

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function convertFile(filePath) {
  const ext = extname(filePath);
  const webpPath = filePath.slice(0, -ext.length) + '.webp';
  const originalStats = await stat(filePath);

  try {
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newStats = await stat(webpPath);
    const saved = originalStats.size - newStats.size;
    const percent = ((saved / originalStats.size) * 100).toFixed(1);

    console.log(
      `✅ ${basename(filePath)} → .webp  |  ` +
      `${(originalStats.size / 1024 / 1024).toFixed(1)}MB → ${(newStats.size / 1024 / 1024).toFixed(1)}MB  |  ` +
      `-${percent}%`
    );

    totalSavedBytes += saved;
    converted++;
  } catch (err) {
    console.error(`❌ Erro em ${basename(filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log('🎨 Iniciando otimização de imagens...\n');
  console.log(`📁 Diretório: ${ASSETS_DIR}`);
  console.log(`🎚️  Qualidade WebP: ${QUALITY}\n`);

  const files = await walkDir(ASSETS_DIR);
  console.log(`📷 ${files.length} imagens encontradas.\n`);

  for (const file of files) {
    await convertFile(file);
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ ${converted} imagens convertidas`);
  console.log(`💾 Economia total: ${(totalSavedBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log('═'.repeat(50));
  console.log('\n⚠️  Os arquivos originais ainda estão no lugar.');
  console.log('   Após verificar que tudo está ok, rode:');
  console.log('   node scripts/optimize-images.mjs --cleanup');
}

// Modo cleanup: remove os originais após confirmação
if (process.argv.includes('--cleanup')) {
  console.log('🗑️  Removendo arquivos originais...\n');
  const files = await walkDir(ASSETS_DIR);
  for (const file of files) {
    const ext = extname(file);
    const webpPath = file.slice(0, -ext.length) + '.webp';
    try {
      await stat(webpPath); // verifica se o .webp existe
      await unlink(file);
      console.log(`  Removido: ${basename(file)}`);
    } catch {
      console.log(`  ⏭️  Mantido (sem webp): ${basename(file)}`);
    }
  }
  console.log('\n✅ Limpeza concluída!');
} else {
  main();
}
